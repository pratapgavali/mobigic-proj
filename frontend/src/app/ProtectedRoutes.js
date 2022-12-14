import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import Dashboard from '../pages/Dashboard'

function ProtectedRoutes() {

    const navigate = useNavigate();

    useEffect(() => {
        const userObj = JSON.parse(localStorage.getItem('user'));
        if (userObj) {
            navigate('/dashboard');
        } else {
            navigate('/login')
        }
    }, []);

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default ProtectedRoutes