import { useState } from "react";

export const useLoggedIn = ()=>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    function Logout(){
        localStorage.clear();
        setUser(null);
    }
    function Login(user){
        user
        setUser(JSON?.stringify(user));
        localStorage.setItem('user',user);
        localStorage.setItem('token',user?.token);
    }
    return { user,Logout};
}