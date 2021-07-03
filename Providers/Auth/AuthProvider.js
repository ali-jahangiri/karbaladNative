import React from 'react';
import { createContext, useState } from "react";
import Login from "../../screens/Login";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const authChecker = () => {
        if(user) {
            return children
        }else {
            <Login />
        }
    }
    return (
        <AuthContext.Provider value={{ setUser , user }}>
            {authChecker()}
        </AuthContext.Provider>
    )
}   


export default AuthProvider;