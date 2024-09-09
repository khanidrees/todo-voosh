import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Auth = ({ children }) => {
    const navigate = useNavigate();
    const {tokens, setTokens} = useContext(AuthContext);
    
  
    if (!tokens) {
        navigate("/signin");
    }
    
  

  return (
     (
      children
    )
  );
}

export default Auth;
