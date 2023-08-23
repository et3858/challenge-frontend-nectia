import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './contexts/UserContext';
import App from './App.jsx';
import './index.css';

// const basename = import.meta.env.DEV ? '/' : '/challenge-frontend-nectia/';
const basename = '/';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <BrowserRouter basename={basename}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </UserProvider>
);
