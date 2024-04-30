import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';

const NavLinks = () =>{
   return(
      <>
      
       <NavLink to="/poesias">POESIAS</NavLink>
       <NavLink to="/historia">HISTORIA</NavLink>
       <NavLink to="/blog">BLOG</NavLink>

      </>
   );
}
   
const Navbar = () => {

  return(
     <nav className='bg-blue-500 flex items-center sm:w-[438px] h-16 bg-transparent'>
        <ul className='bottom-0 left-0 text-3xl text-slate-50 underline sm:flex no-underline text-base sm:place-content-around gap-10'>
            <NavLinks/>
        </ul>
     </nav>
  )
 
}


export default Navbar;