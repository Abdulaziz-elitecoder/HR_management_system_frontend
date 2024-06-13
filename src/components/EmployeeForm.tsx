import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css'; // Import CSS for styling

interface EmployeeFormProps {
    onAddEmployee: (employee: Employee) => void; // Callback function to notify parent component
}

interface Employee {
    id: number;
    username: string;
    email: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onAddEmployee }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isHr, setIsHr] = useState(false);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post<Employee>('http://localhost:8000/api/employees/', { username, email, is_hr: isHr }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            onAddEmployee(response.data); // Notify parent component with the new employee data
            setUsername('');
            setEmail('');
            setIsHr(false);
            setUsernameError(null); // Reset errors after successful submission
            setEmailError(null);
        } catch (error:any) {
            if (error.response && error.response.data) {
                const { data } = error.response;
                if (data.username) {
                    setUsernameError(data.username[0]); // Display username error message
                } else {
                    setUsernameError(null);
                }
                if (data.email) {
                    setEmailError(data.email[0]); // Display email error message
                } else {
                    setEmailError(null);
                }
            } else {
                console.error('Error adding employee:', error);
            }
        }
    };

    const handleUsernameChange = (value: string) => {
        setUsername(value);
        setUsernameError(null); // Reset error message when username changes
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setEmailError(null); // Reset error message when email changes
    };

    return (
        <form className="employee-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e) => handleUsernameChange(e.target.value)} placeholder="Enter username" required />
                {usernameError && <span className="error-message">{usernameError}</span>} {/* Display username error */}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => handleEmailChange(e.target.value)} placeholder="Enter email" required />
                {emailError && <span className="error-message">{emailError}</span>} {/* Display email error */}
            </div>
            <div className="form-group">
                <label>
                    <input type="checkbox" checked={isHr} onChange={(e) => setIsHr(e.target.checked)} />
                    <span>HR Employee</span>
                </label>
            </div>
            <button type="submit" className="submit-button">Add Employee</button>
        </form>
    );
};

export default EmployeeForm;