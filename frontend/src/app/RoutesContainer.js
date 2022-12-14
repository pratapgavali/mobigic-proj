import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoutes from './ProtectedRoutes';

function RoutesContainer() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route path="*" element={<ProtectedRoutes />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesContainer