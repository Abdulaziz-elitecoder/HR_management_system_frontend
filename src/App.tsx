import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmployeePage from './pages/EmployeePage';
import AttendancePage from './pages/AttendancePage';
import NavBar from './components/Navbar';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));

    const handleLogin = (token: string) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/login" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/employees" />} />
                <Route path="/employees" element={isLoggedIn ? <EmployeePage /> : <Navigate to="/login" />} />
                <Route path="/attendance" element={isLoggedIn ? <AttendancePage /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
