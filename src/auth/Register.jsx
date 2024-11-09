import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Form, Input, Button } from '../styles';

const Register = () => {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        const success = register(username, email, securityQuestion, password);
        if (success) {
            navigate('/login');
        }
    };

    return (
        <Form onSubmit={handleRegister}>
            <h2>Register</h2>
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <Input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Security Question (e.g., Favorite color)"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button type="submit">Register</Button>
        </Form>
    );
};

export default Register;
