import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmployeePage from './pages/EmployeePage';
import AttendancePage from './pages/AttendancePage';

const App: React.FC = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/employees" element={token ? <EmployeePage /> : <Navigate to="/login" />} />
                <Route path="/attendance" element={token ? <AttendancePage /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
