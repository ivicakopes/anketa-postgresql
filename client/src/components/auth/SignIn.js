import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log_name:'',
      password:'',
      logovan: false,
      role:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
   
  handleChange = (e) => { 
    this.setState ({ [e.target.id]:e.target.value })
  }

  handleSubmit = (e) => { 
    e.preventDefault(this.state);   
    this.props.change(this.state.log_name, this.state.password);
    this.setState ({ logovan: true });      
  }

  render() {
    if (this.state.logovan) {
      return <Redirect to='/' />
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white" style={{padding : 20 }}>
            <h5 className="grey-text text-darken-3">Sign In</h5>
               <div className="input-field">
                   <label>Korisničko ime</label>
                   <input type="text" id="log_name" onChange={this.handleChange} required/>
               </div> 
               <div className="input-field">
                   <label htmlFor="password">Password</label>
                   <input type="password" id="password" onChange={this.handleChange} required/>
               </div> 
               <div className="input-field">
                  <button className="btn pink lighten-1 z-depth-0">Login</button>
               </div>
        </form>          
      </div>
    )
  }
}

export default SignIn;