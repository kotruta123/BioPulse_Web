import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Form, Input, Button } from "../styles";

const RestoreCredentials = () => {
    const { restorePassword } = useAuth();
    const [username, setusername] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRestorePassword = (e) => {
        e.preventDefault();
        if (newPassword !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");
        const success = restorePassword(username, securityQuestion, newPassword);
        if (success) {
            navigate("/login");
        }
    };

    return (
        <Form onSubmit={handleRestorePassword}>
            <h2>Restore Password</h2>
            <Input
                type="text"
                placeholder="Email"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
            />
            <Input
                type="text"
                placeholder="Answer to Security Question"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Repeat New Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button type="submit">Reset Password</Button>
        </Form>
    );
};

export default RestoreCredentials;
