
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Components/pages/Login/login.jsx';
import Register from './Components/Register/register.jsx';
import ForgotPassword from './Components/pages/ForgotPassword/ForgotPassword.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                 <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                 <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

