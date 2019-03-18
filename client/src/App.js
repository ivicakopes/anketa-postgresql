import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_korisnik: null,
      log_name: null,
      ime: null,
      prezime: null,
      role: null,
      postoji:false
    }
    this.changeUser = this.changeUser.bind(this);
    this.log_out = this.log_out.bind(this);
  }

  changeUser(log_ime, password){
    fetch(`/api/korisnik/${log_ime}/${password}`)
    .then(res =>res.json())
   // .then(res => this.setState({ postoji: res[0] }))
    .then (res => {
      console.log(res);      
      console.log(res[0].id_korisnik);
      this.setState({  
        id_korisnik: res[0].id_korisnik,     
        log_name : res[0].log_ime,
        ime: res[0].ime,
        prezime: res[0].prezime,
        role: res[0].vrsta_id            
      });
        return
      })    
    .then(() => console.log(this.state) )     
  }   
  
  log_out(){
    this.setState ({
      id_korisnik: null,
      log_name: null,
      ime: null,
      prezime: null,
      role: null    
    });
    console.log("logout")
  }
  
  getKorisnikByLogime = () => {
    fetch(`/api/korisnik/${this.state.log_name}`)
    .then(res =>res.json())
    .then(res => { 
      var korisnikSaId = res[0];  
      console.log("1." + korisnikSaId.log_ime);
      this.setState({ korisnikSaId })
    })
    .then(res => console.log(this.state.korisnikSaId))   
  };

  render() {
    return ( 
      <BrowserRouter>
        <div className="App">  
            <Navbar log_out ={this.log_out} log_name={this.state.log_name} />
            <br/><br/>
            {this.state.log_ime}
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/signin" render={(props) => <SignIn {...props} change={this.changeUser} />}/>
              <Route path="/signup" render={(props) => <SignUp {...props} change={this.changeUser} />}/>
              
            </Switch>
        </div> 
      </BrowserRouter>       
    );
  }
}

export default App;