
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Tasks from './pages/Tasks.jsx'
import { Toaster } from 'react-hot-toast'
import Auth from './components/Auth.jsx'
import NavBar from './components/NavBar.jsx'
import { AuthContext } from './contexts/AuthContext.js'
import { useEffect, useState } from 'react';

function getInitialState() {
  const tokens = localStorage.getItem('tokens')
  return tokens ? JSON.parse(tokens) : null;
}

function App() {
  const [authTokens, setAuthTokens] = useState(getInitialState);

  useEffect(() => {
    if(authTokens){
      localStorage.setItem('token', authTokens?.token);
      localStorage.setItem('userId', authTokens?.id);
    }else{
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
    
  }, [authTokens])
    return( 
    <AuthContext.Provider value={{tokens: authTokens,setTokens:setAuthTokens}}>
      <div><Toaster/></div>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route
            path='/signup'
            element={<SignUp/>}
            />
            <Route
            path='/signin'
            element={<Login/>}
            />
            <Route
            path='/'
            element={<Auth><Tasks/></Auth>}
            />

          </Routes>
        </BrowserRouter>
    </AuthContext.Provider>)
}

export default App
