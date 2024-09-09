import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Auth = ({ children }) => {
    const navigate = useNavigate();
    const {tokens, setTokens} = useContext(AuthContext);
    
  
    if (!tokens?.token) {
        return <Navigate to={'/signin'} replace/>
    }
    
  

  return (
     (
      children
    )
  );
}

export default Auth;
