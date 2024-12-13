import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { Form, Input, Button, ErrorMessage } from "../styles";
import MessageBanner from "./MessageBanner";

const RestoreCredentials = () => {
    const [email, setEmail] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [answerError, setAnswerError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState(""); // General error from server
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleFetchSecurityQuestion = async () => {
        setSecurityQuestion("");
        setEmailError("");
        setFormError("");

        if (!email) {
            setEmailError("Email is required to retrieve security question.");
            return;
        }

        try {
            setLoading(true);
            const question = await UserService.getSecurityQuestion(email);
            if (!question) {
                setEmailError("No security question found for this email.");
            } else {
                setSecurityQuestion(question);
            }
        } catch (err) {
            console.error("Error fetching security question:", err.message);
            setEmailError(err.response?.data || "Failed to retrieve security question.");
        } finally {
            setLoading(false);
        }
    };

    const handleRestorePassword = async (e) => {
        e.preventDefault();
        // Clear previous errors
        setEmailError("");
        setAnswerError("");
        setPasswordError("");
        setFormError("");

        // Validation before server call
        if (!email) {
            setEmailError("Email is required before password reset.");
            return;
        }

        if (!securityQuestion) {
            setEmailError("Please retrieve and confirm the security question first.");
            return;
        }

        if (!securityAnswer) {
            setAnswerError("Answer is required.");
            return;
        }

        if (!newPassword || !repeatPassword) {
            setPasswordError("Both password fields are required.");
            return;
        }

        if (newPassword !== repeatPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await UserService.recoverPassword(email, securityQuestion, securityAnswer, newPassword);
            setSuccessMessage("Password reset successful!");
            navigate("/login");
        } catch (err) {
            console.error("Password recovery failed:", err.message);
            const serverMessage = err.response?.data || "Password recovery failed.";

            // Additional parsing of serverMessage for known error types
            if (serverMessage.toLowerCase().includes("incorrect answer")) {
                setAnswerError("The security answer is incorrect. Please try again.");
            } else if (serverMessage.toLowerCase().includes("password complexity")) {
                setPasswordError("Your new password does not meet complexity requirements.");
            } else if (serverMessage.toLowerCase().includes("email not found")) {
                setEmailError("No account found with this email.");
            } else {
                // If we can't pinpoint a field error, show a general form error
                setFormError(serverMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <MessageBanner message={successMessage} />
            <Form onSubmit={handleRestorePassword}>
                <h2>Restore Password</h2>

                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    onBlur={handleFetchSecurityQuestion}
                    data-testid="email-input"
                />
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

                {securityQuestion && (
                    <Input
                        type="text"
                        value={securityQuestion}
                        disabled
                        style={{ fontStyle: "italic", backgroundColor: "#f5f5f5" }}
                        data-testid="security-answer-input"
                    />
                )}

                <Input
                    type="text"
                    placeholder="Answer to Security Question"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    required
                    data-testid="security-answer-input"
                />
                {answerError && <ErrorMessage>{answerError}</ErrorMessage>}

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
                {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

                {formError && <ErrorMessage>{formError}</ErrorMessage>}

                <Button type="submit" disabled={loading} data-testid="reset-button">
                    {loading ? "Processing..." : "Reset Password"}
                </Button>
            </Form>
        </>
    );
};

export default RestoreCredentials;
