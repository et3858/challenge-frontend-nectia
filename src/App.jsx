import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppComponent from './views/App';
import Login from './views/Login';
import Home from './views/Home';
import NotFound from './views/NotFound';


function App() {
    return (
        <Routes>
            <Route index element={<AppComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}


export default App;
