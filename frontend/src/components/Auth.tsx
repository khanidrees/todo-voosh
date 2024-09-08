import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Auth = ({ children }) => {
    const navigate = useNavigate();
    
  useEffect(() => {
    if (!localStorage.getItem("token")) {
        navigate("/signin");
    }
    
  } , []);

  return (
     (
      children
    )
  );
}

export default Auth;
