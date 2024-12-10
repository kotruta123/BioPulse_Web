import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Form, Input, Button } from "../styles";

const Login = ({ onSwitchToRestore }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate("/dashboard");
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <h2>Login</h2>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Button type="button" onClick={onSwitchToRestore} style={{ color: "red", backgroundColor: "transparent" }}>
                Forgot Password?
            </Button>
        </Form>
    );
};

export default Login;
