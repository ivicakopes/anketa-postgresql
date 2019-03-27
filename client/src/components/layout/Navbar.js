import React from 'react';
import {NavLink} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import AdminLinks from './adminLinks';
const Navbar = (props)=> {
  
   const { log_name, role} = props;
   const adLinks = role === 0  ?  <AdminLinks log_out={props.log_out}/> : null ;
   const links = log_name ?  <SignedInLinks log_out={props.log_out}/> : <SignedOutLinks/>;
   const name = log_name ?  log_name  : 'Nije logovan';
  
   return(      
      <nav className="nav-wrapper green darken-3">
      
         <div className="container">
            <NavLink to = '/' className="brand-logo">Anketa Project</NavLink> 
            <div style={{textAlign: 'right'}}> { name }  { links } { adLinks }</div>           
                      
         </div>
      </nav>
   )
}

export default  Navbar;