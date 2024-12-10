import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { Form, Input, Button, ErrorMessage } from "../styles";

const RestoreCredentials = () => {
    const [email, setEmail] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Function to retrieve the security question
    const handleFetchSecurityQuestion = async () => {
        if (!email) {
            setError("Please enter your email to retrieve the security question.");
            return;
        }

        try {
            setError("");
            setLoading(true);
            const question = await UserService.getSecurityQuestion(email);
            setSecurityQuestion(question); // Display the retrieved question
        } catch (err) {
            console.error("Error fetching security question:", err.message);
            setError(err.response?.data || "Failed to retrieve security question.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle password recovery
    const handleRestorePassword = async (e) => {
        e.preventDefault();

        if (!securityAnswer || !newPassword || !repeatPassword) {
            setError("All fields are required.");
            return;
        }

        if (newPassword !== repeatPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setError("");
            setLoading(true);
            await UserService.recoverPassword(email, securityQuestion, securityAnswer, newPassword);
            alert("Password reset successful!");
            navigate("/login");
        } catch (err) {
            console.error("Password recovery failed:", err.message);
            setError(err.response?.data || "Password recovery failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleRestorePassword}>
            <h2>Restore Password</h2>

            {/* Email Field */}
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                onBlur={handleFetchSecurityQuestion} // Fetch security question on blur
            />

            {/* Display the Security Question */}
            {securityQuestion && (
                <Input
                    type="text"
                    value={securityQuestion}
                    disabled // Prevent user from modifying
                    style={{ fontStyle: "italic", backgroundColor: "#f5f5f5" }}
                />
            )}

            {/* Security Answer Field */}
            <Input
                type="text"
                placeholder="Answer to Security Question"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
            />

            {/* New Password Fields */}
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

            {/* Error Message */}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {/* Submit Button */}
            <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Reset Password"}
            </Button>
            <Button type="button" onClick={() => navigate("/login")}>
                Go to Login
            </Button>
        </Form>
    );
};

export default RestoreCredentials;
