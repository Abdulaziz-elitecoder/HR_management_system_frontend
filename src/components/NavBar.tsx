import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import CSS for styling

interface NavBarProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, handleLogout }) => {
    const navigate = useNavigate();

    const handleAuthClick = () => {
        if (isLoggedIn) {
            handleLogout();
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/employees">Employees</Link>
                </li>
                <li>
                    <Link to="/attendance">Attendance</Link>
                </li>
                <li>
                    <button onClick={handleAuthClick}>
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
