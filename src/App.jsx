import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import AppComponent from './views/App';
import Login from './views/Login';
import Home from './views/Home';
import NotFound from './views/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { UserContext } from './contexts/UserContext';


function App() {
    const userDetails = useContext(UserContext);


    return (
        <Routes>
            <Route index element={<AppComponent />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes for user already logged in */}
            <Route element={<ProtectedRoute user={userDetails} redirectPath="/login" />}>
                <Route path="/home" element={<Home />} />
            </Route>

            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}


export default App;
