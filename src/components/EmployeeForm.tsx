import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

interface Employee {
    id: number;
    username: string;
    email: string;
    is_hr: boolean;
}

interface EmployeeFormProps {
    onAddEmployee: (employee: Employee) => void;
    onUpdateEmployee: (employee: Employee) => void;
    editingEmployee: Employee | null;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onAddEmployee, onUpdateEmployee, editingEmployee }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // const [isHr, setIsHr] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editingEmployee) {
            setUsername(editingEmployee.username);
            setEmail(editingEmployee.email);
            // setIsHr(editingEmployee.is_hr);
            setIsEditing(true);
        } else {
            setUsername('');
            setEmail('');
            // setIsHr(false);
            setIsEditing(false);
        }
    }, [editingEmployee]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (isEditing && editingEmployee) {
                const response = await axios.put(`http://localhost:8000/api/employees/${editingEmployee.id}/`, { username, email}, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
                });
                onUpdateEmployee(response.data);
            } else {
                const response = await axios.post('http://localhost:8000/api/employees/', { username, email }, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
                });
                onAddEmployee(response.data);
            }
            setUsername('');
            setEmail('');
            // setIsHr(false);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving employee', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            {/* <label>
                <input type="checkbox" checked={isHr} onChange={(e) => setIsHr(e.target.checked)} />
                HR Employee
            </label> */}
            <button type="submit">{isEditing ? 'Update Employee' : 'Add Employee'}</button>
        </form>
    );
};

export default EmployeeForm;
