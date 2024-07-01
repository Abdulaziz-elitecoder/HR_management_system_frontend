import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceForm from '../components/AttendanceForm';
import './AttendancePage.css';

interface AttendanceRecord {
    id: number;
    employee: string;
    date: string;
    present: boolean;
}

const AttendancePage: React.FC = () => {
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

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

    const handleAddAttendance = (newAttendance: AttendanceRecord) => {
        setAttendanceRecords(prevRecords => [...prevRecords, newAttendance]);
    };

    return (
        <div className="attendance-page">
            <h2>Attendance</h2>
            <AttendanceForm onAddAttendance={handleAddAttendance} />
            <div className="attendance-list">
                {attendanceRecords.map((record) => (
                    <div key={record.id} className={`attendance-item ${record.present ? 'present' : 'absent'}`}>
                        <span>{record.employee}</span>
                        <span>{record.date}</span>
                        <span>{record.present ? 'On-site' : 'Online'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AttendancePage;
