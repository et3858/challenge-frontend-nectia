import React, { createContext, useState } from 'react';


const UserContext = createContext();
const UserDispatchContext = createContext();
const USER_DETAILS_KEY = 'userDetails';
const data = JSON.parse(localStorage.getItem(USER_DETAILS_KEY)) || null;


function UserProvider({ children }) {
    const [userDetails, setUserDetails] = useState(data);


    const login = (payload) => {
        setUserDetails(payload);
        localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(payload));
    };


    const logout = () => {
        localStorage.removeItem(USER_DETAILS_KEY);
        setUserDetails(null);
    };


    return (
        <UserContext.Provider value={userDetails}>
            <UserDispatchContext.Provider value={{ login, logout }}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export {
    UserContext,
    UserDispatchContext,
    UserProvider,
};
