import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Employee {
    id: number;
    username: string;
    email: string;
}

interface Attendance {
    id: number;
    employee: number;
    date: string;
    present: boolean;
}

const AttendanceForm: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [present, setPresent] = useState(true);

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/attendance/', { employee: employeeId, date, present }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            setEmployeeId('');
            setDate('');
            setPresent(true);
        } catch (error) {
            console.error('Error adding attendance', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.username}</option>
                ))}
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <label>
                <input type="checkbox" checked={present} onChange={(e) => setPresent(e.target.checked)} />
                Present
            </label>
            <button type="submit">Add Attendance</button>
        </form>
    );
};

export default AttendanceForm;
