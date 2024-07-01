import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from '../components/EmployeeForm';
import './EmployeePage.css';
import './EmployeeCard.css';

interface Employee {
    id: number;
    username: string;
    email: string;
    is_hr: boolean;
}

const EmployeePage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await axios.get('http://localhost:8000/api/employees/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            setEmployees(response.data);
        };
        fetchEmployees();
    }, []);

    const handleAddEmployee = (newEmployee: Employee) => {
        setEmployees([...employees, newEmployee]);
    };

    const handleUpdateEmployee = (updatedEmployee: Employee) => {
        setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
        setEditingEmployee(null);
    };

    const handleDeleteEmployee = async (employeeId: number) => {
        try {
            await axios.delete(`http://localhost:8000/api/employees/${employeeId}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            setEmployees(employees.filter(emp => emp.id !== employeeId));
        } catch (error) {
            console.error('Error deleting employee', error);
        }
    };

    return (
        <div>
            <h2>Employees</h2>
            <EmployeeForm onAddEmployee={handleAddEmployee} onUpdateEmployee={handleUpdateEmployee} editingEmployee={editingEmployee} />
            <div>
                {employees.map((employee) => (
                    <div key={employee.id} className="employee-card">
                        <div className="info">
                            <span><strong>Username:</strong> {employee.username}</span>
                            <span><strong>Email:</strong> {employee.email}</span>
                            <span><strong>Role:</strong> {employee.is_hr ? 'HR' : 'Employee'}</span>
                        </div>
                        <div className="actions">
                            <button onClick={() => setEditingEmployee(employee)}>Edit</button>
                            <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeePage;
