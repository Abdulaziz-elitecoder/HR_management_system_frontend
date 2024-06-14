import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

interface LoginPageProps {
    onLogin: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/token/login/', { email, password });
            const token = response.data.auth_token;
            onLogin(token);
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
        <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <span>{error}</span>}
        <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
