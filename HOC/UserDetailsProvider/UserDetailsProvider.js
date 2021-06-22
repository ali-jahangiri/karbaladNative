import React, { createContext, useState } from 'react';

export const UserDetails = createContext({
    userDetails : {},
    setUserDetails : () => {}
})

const UserDetailsProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({});
    
    return (
        <UserDetails.Provider value={{ userDetails , setUserDetails }} >
            {children}
        </UserDetails.Provider>
    )
}


export default UserDetailsProvider;