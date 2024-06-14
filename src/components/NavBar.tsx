import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC<{ isLoggedIn: boolean; onLogout: () => void }> = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink 
                        to="/employees" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Employees
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/attendance" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        Attendance
                    </NavLink>
                </li>
                <li className="right">
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <NavLink 
                            to="/login" 
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Login
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
