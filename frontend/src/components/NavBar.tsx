import React from 'react'
import { MdEventNote } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { useLoggedIn } from '../hooks/useLoggedIn';


const NavBar = () => {
    const {user, Logout} = useLoggedIn();
  return (
    <div className='flex justify-between items-center p-4 bg-col'>
        <div><MdEventNote color='white' size={'2rem'}/></div>
        
        {user?
        <div className='flex gap-4'>
            <div>
                <button 
                className=''
                onClick={Logout}
                >Logout</button>
            </div>
        </div>
        :
        <div className='flex gap-4'>        
            <div>
                <NavLink 
                to={'/signin'}
                className={({ isActive, isPending }) =>
                    isActive ? "active" : ""
                }
                >Login</NavLink>
            </div>
            <div>
                <NavLink to={'/signup'}>Signup</NavLink>
            </div>
        </div>   
        }
    </div>
  )
}

export default NavBar