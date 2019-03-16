import React from 'react';
import {NavLink} from 'react-router-dom';

const SignedInLinks = (props)=> {
   console.log("signedinlinks");
   console.log(props);
   return(
      <ul className="right">
         <li><a href="/signin" onClick ={props.log_out}>LogOut</a></li>
         <li><NavLink to='/' className='btn-floating pink lighten-1 center'>NN</NavLink></li>  
      </ul>
   )
}

export default SignedInLinks;