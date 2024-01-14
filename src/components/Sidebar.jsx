import React from 'react';
import { FiHome } from "react-icons/fi";
import { RiTeamFill } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
// Array 'navLink' containing objects representing navigation links
const navLink = [
  {
      name: 'Home',
      link: '/',           
      icon: <FiHome />,    
      check: ''             // Additional check, possibly for conditional styling
  },
  {
      name: 'Team',
      link: '/my-pokemon',      
      icon: <RiTeamFill />,     
      check: 'my-pokemon'        // Additional check, possibly for conditional styling
  },

];
const Sidebar = ({showSidebar, setShowSidebar}) => {
    const location = useLocation()
    const pathname = location.pathname.split('/')
    console.log(pathname)
  return (
    <div className={`h-[100vh]  bg-white px-4 flex flex-col items-center w-0 py-6 ${showSidebar ? 'sidebar-slide-out-in' : "sidebar-slide-in"} `}>
      <img src='/logo.png' className='w-[100%]'/>


      <div className='mt-20 w-[100%] flex flex-col gap-4'>
        {
            navLink.map((link, index) => (

                <Link key={index} to={link.link}>
                <div  className={`flex flex-row gap-6 items-center  ${pathname[pathname.length - 1] === link.check ? 'rounded-md bg-orange-500 text-white' : ''} ${showSidebar ? 'items-center justify-center py-5' : 'px-5 py-3'}`}>
                    <div className='text-[24px]'>
                    {link.icon}
                    </div>
                    
                    <h1 className={`${!showSidebar ? 'flex' : 'hidden'}`}>{link.name}</h1>
                </div>
                </Link>
            ))
        }
      </div>
    </div>
  );
}

export default Sidebar;
