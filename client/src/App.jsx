
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
import { TaskContext } from './contexts/TaskContext.js'

function getInitialState() {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('userId');
  console.log(token );
  console.log(id);
  return { token, id };
}

function App() {
  const [authTokens, setAuthTokens] = useState(getInitialState);
  const [todoData, setTodoData] = useState({
    todo: {
      id: 1,
      title: "TODO",
      items: [],
    },
    inprogress: {
        id: 2,
        title: "INPROGRESS",
        items: [],
      },
    done: {
      id: 3,
      title: "DONE",
      items: [],
    },
  });

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
    <TaskContext.Provider value={{todoData,setTodoData}}> 
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
      </AuthContext.Provider>
    </TaskContext.Provider> )
}

export default App
