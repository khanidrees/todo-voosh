
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login'
import Tasks from './pages/Tasks.jsx'
import { Toaster } from 'react-hot-toast'
import Auth from './components/Auth.jsx'
import NavBar from './components/NavBar.jsx'

function App() {
    return( 
    <>
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
    </>)
}

export default App
