import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Form, Input, Button } from '../styles';

const Login = () => {
    const { login, loginAsGuest } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            navigate('/dashboard');
        }
    };

    const handleGuestLogin = () => {
        loginAsGuest();
        navigate('/dashboard');
    };

    return (
        <Form onSubmit={handleLogin}>
            <h2>Login</h2>
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit">Login</Button>
            <Button type="button" onClick={handleGuestLogin}>Login as Guest</Button>
        </Form>
    );
};

export default Login;
