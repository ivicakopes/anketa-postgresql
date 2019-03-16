import React, { Component } from 'react';
import '../App.css';

class Login extends Component {
   render() {
     return (
       <div>
         <header >           
           <h3>
            Login komponenta
           </h3> 

           <input type={Text} placeholder='mail'></input> 
           <br/>
           <input type={Text} placeholder='password'></input>          
         </header>
       </div>
     );
   }
 }
 
 export default Login;
 