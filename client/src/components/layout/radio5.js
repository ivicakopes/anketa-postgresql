import React from 'react';

const Radio5 = (props)=> {
   return(
         <span className="right">
            ocena 1 <input type="radio" id="o1" name="first_item" value="v1" style={{position:'relative', opacity:1,marginRight:30 + 'px',marginLeft:5 + 'px'}} />
            ocena 2 <input type="radio" id="o2" name="first_item" value="v2" style={{position:'relative', opacity:1,marginRight:30 + 'px',marginLeft:5 + 'px'}} />
            ocena 3 <input type="radio" id="o3" name="first_item" value="v3" style={{position:'relative', opacity:1,marginRight:30 + 'px',marginLeft:5 + 'px'}} />
            ocena 4 <input type="radio" id="o4" name="first_item" value="v4" style={{position:'relative', opacity:1,marginRight:30 + 'px',marginLeft:5 + 'px'}} />
            ocena 5 <input type="radio" id="o5" name="first_item" value="v5" style={{position:'relative', opacity:1,marginRight:30 + 'px',marginLeft:5 + 'px'}} />      
         </span>
   )
}

export default Radio5;