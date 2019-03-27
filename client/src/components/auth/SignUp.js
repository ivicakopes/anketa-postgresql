import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Input,
} from 'reactstrap'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        log_name:'',
        password:'',
        ime:'',
        prezime:'',
        role:'',
        korisnikSaId: null,
        logovan: false,
        postoji: false,
        bazaVrste: [],
        roleSelected: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleRadio = this.toggleRadio.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
}

componentDidMount () {
  this.getVrsteList();
  this.selectedCheckboxes = new Set();
}

getVrsteList = () => {
  fetch('/api/vrste/bezAdmina')
  .then(res => res.json())    
  .then(res => {
    var bazaVrste = res;
    this.setState({ bazaVrste });
    var vrsteList = res.map(r => r.naziv_vrste);
    this.setState({ vrsteList });
  });
};

handleSubmit = (e) => {
  e.preventDefault();
  fetch(`/api/korisnik/${this.state.log_name}`)
  .then(res =>res.json())
  .then(res => this.setState({ postoji: res[0] }))
  .then (res => {
    if(!this.state.postoji){
      fetch('/api/korisnik', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          log_ime: this.state.log_name,
          ime: this.state.ime,
          prezime: this.state.prezime,
          vrsta_id: this.state.roleSelected,
          password: this.state.password
        })
      });
      this.props.change(this.state.log_name, this.state.password);
      this.setState ({
        logovan: true
      });
    }
  })
}

handleRadio = (e) => {
  var roleSelected = e.target.value;
  if(roleSelected !== undefined) 
    this.setState ({ roleSelected })
}

toggleRadio (){}

handleChange = (e) => {
  this.setState ({
      [e.target.id]:e.target.value
  })
}

  render() {
    let poruka ;    
    if (this.state.logovan) {
      return <Redirect to='/' />
    }
    if ( this.state.postoji ) {
      poruka =<div className="red"> Takav korisnik već postoji</div>
    }
    const radio =  this.state.bazaVrste.map((vrsta, i) => 
      <div  key={i}>
        <label onClick={this.handleRadio} value="vrsta.id_vrste" style={{marginLeft:40 +'px'}}>                     
            <Input type="radio" name="radioRole" onChange={this.toggleRadio} value={vrsta.id_vrste} key={vrsta.id_vrste} style={{opacity:1}} />
              {vrsta.naziv_vrste}                       
        </label>
      </div>)
    
    
    return (
      <div className="container" >
        <form onSubmit={this.handleSubmit} className="white" style={{padding : 20 }}>
            <h5 className="grey-text text-darken-3">Sign Up</h5>
               <div className="input-field">
                   <label>Korisničko ime</label>
                   <input type="text" id="log_name" onChange={this.handleChange} required/>
               </div> 
               <div className="input-field">
                   <label htmlFor="password">Password</label>
                   <input type="password" id="password" onChange={this.handleChange} required/>
               </div>
               <div className="input-field">
                   <label htmlFor="firstName">Ime</label>
                   <input type="text" id="ime" onChange={this.handleChange} required/>
               </div>
               <div className="input-field">
                   <label htmlFor="lastName">Prezime</label>
                   <input type="text" id="prezime" onChange={this.handleChange} required/>
               </div> 

               
               <div>
                             
               </div>              
               <div className="input-field">
                  <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
               </div> 
        </form>          
          { poruka }
          { radio }    
             
      </div>
    )
  }
}

export default SignUp;
