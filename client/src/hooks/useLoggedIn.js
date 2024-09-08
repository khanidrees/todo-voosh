import { useEffect, useState } from "react";

export const useLoggedIn = ()=>{
    const [user, setUser] = useState(localStorage.getItem('user'));
    useEffect(()=>{
        let userObj = JSON.parse(localStorage.getItem('user'));
        setUser(userObj);
    },[])

    function Logout(){
        localStorage.clear();
        setUser(null);
    }
    function Login(user){
        
        
        localStorage.setItem('user',JSON?.stringify(user));
        localStorage.setItem('token',user?.token);
    }
    return { user,Logout, Login, setUser};
    
}