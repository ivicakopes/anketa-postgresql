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
      log_name: null,
      password: null,
      role: null
    }
    this.changeUser = this.changeUser.bind(this);
    this.log_out = this.log_out.bind(this);
  }

  changeUser(log_ime,password,role){
    this.setState ({
      log_name: log_ime,
      password: password,
      role: role
    });
  }
  
  log_out(){
    this.setState ({
      log_name: null,
      password: null,
      role: null     
    });
    console.log("logout")
  }
  

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
              <Route path="/signup" component={SignUp}/>
              
            </Switch>
        </div> 
      </BrowserRouter>       
    );
  }
}

export default App;