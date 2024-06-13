import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from '../components/EmployeeForm';
import './EmployeePage.css'; // Import CSS for styling

interface Employee {
    id: number;
    username: string;
    email: string;
}

const EmployeePage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get<Employee[]>('http://localhost:8000/api/employees/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
                });
                setEmployees(response.data);
            } catch (error) {
                setError('Error fetching employees');
                console.error('Error fetching employees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const addEmployee = (newEmployee: Employee) => {
        setEmployees([...employees, newEmployee]);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="employee-page">
            <h2>Employees</h2>
            <EmployeeForm onAddEmployee={addEmployee} />
            <div className="employee-list">
                {employees.map((employee) => (
                    <div key={employee.id} className="employee-card">
                        <h3>{employee.username}</h3>
                        <p>Email: {employee.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeePage;
