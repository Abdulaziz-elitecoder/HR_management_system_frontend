import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceForm from '../components/AttendanceForm';

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

const AttendancePage: React.FC = () => {
    const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);

    useEffect(() => {
        const fetchAttendance = async () => {
            const response = await axios.get('http://localhost:8000/api/attendance/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            setAttendanceRecords(response.data);
        };
        fetchAttendance();
    }, []);

    return (
        <div>
            <h2>Attendance Records</h2>
            <AttendanceForm />
            <ul>
                {attendanceRecords.map((record) => (
                    <li key={record.id}>
                        Employee ID: {record.employee}, Date: {record.date}, Present: {record.present ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttendancePage;
