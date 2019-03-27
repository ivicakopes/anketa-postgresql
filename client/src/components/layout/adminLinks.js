import React from 'react';
import {NavLink} from 'react-router-dom';

const AdminLinks = (props)=> {
   return(
      <ul className="right" style={{marginRight:30 +'px'}}>
         <li><NavLink to='/testpage'>TESTPAGE</NavLink></li>
         <li><NavLink to='/vrste'>Vrste</NavLink></li>
         <li><NavLink to='/pitanja'>Pitanja</NavLink></li>
         <li><NavLink to='/ankete'>Ankete</NavLink></li>  
         <li><NavLink to='/pregled'>Pregled</NavLink></li>
         <li><NavLink to='/popuni'>Popuni</NavLink></li>
      </ul>
   )
}

export default AdminLinks;