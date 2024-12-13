import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Form, Input, Button, ErrorMessage } from "../styles";
import MessageBanner from "./MessageBanner";

const Login = ({ onSwitchToRestore }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState(""); // General form error
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setFormError(""); // clear previous error
        const result = await login(email, password);
        if (result.success) {
            setSuccessMessage("Logged in successfully!");
            navigate("/dashboard");
        } else {
            setFormError(result.message || "Login failed. Please try again.");
        }
    };

    return (
        <>
            <MessageBanner message={successMessage} />
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
                {/* Display form error under the fields */}
                {formError && <ErrorMessage>{formError}</ErrorMessage>}

                <Button type="submit">Login</Button>
                <Button
                    type="button"
                    onClick={onSwitchToRestore}
                    style={{ color: "red", backgroundColor: "transparent" }}
                >
                    Forgot Password?
                </Button>
            </Form>
        </>
    );
};

export default Login;
