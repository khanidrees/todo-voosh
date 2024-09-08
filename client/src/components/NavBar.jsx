import React, { useContext } from 'react'
import { MdEventNote } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


const NavBar = () => {
    const {tokens, setTokens} = useContext(AuthContext);
    const navigate= useNavigate();
    console.log(tokens);
  return (
    <div className='flex justify-between items-center p-4 bg-col'>
        <div><MdEventNote color='white' size={'2rem'}/></div>
        
        {tokens?
        <div className='flex gap-4'>
            <div>
                <button 
                className=''
                onClick={()=>{
                    setTokens();
                    navigate('/signin')
                }}
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