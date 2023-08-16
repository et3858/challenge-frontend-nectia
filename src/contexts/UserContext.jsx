import React, { createContext, useState } from 'react';


const UserContext = createContext(null);
const UserDispatchContext = createContext(null);


function UserProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);


    return (
        <UserContext.Provider value={userDetails}>
            <UserDispatchContext.Provider value={setUserDetails}>
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
