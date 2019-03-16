import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props)=> {
  
   const { log_name } = props;
   const links = log_name ?  <SignedInLinks log_out={props.log_out}/> : <SignedOutLinks/>;
   const name = log_name ?  log_name  : 'Nije logovan';
   console.log("navbar");
   console.log(props);
  
   return(      
      <nav className="nav-wrapper green darken-3">
      
         <div className="container">
            <Link to = '/' className="brand-logo">Anketa Project</Link> 
            <div style={{textAlign: 'center'}}> { name }  { links } </div>           
                      
         </div>
      </nav>
   )
}

export default  Navbar;