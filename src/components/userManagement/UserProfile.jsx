import React, { useEffect, useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";

// Global styles
const GlobalStyle = createGlobalStyle`
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
`;

// Animations
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
    from { opacity: 0; max-height: 0; transform: translateY(-10px);}
    to { opacity: 1; max-height: 1000px; transform: translateY(0);}
`;

const countdown = keyframes`
    from { width: 100%; }
    to { width: 0%; }
`;

// Validation Helpers
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=.{8,})/.test(password);

const ProfilePageWrapper = styled.div`
    min-height: 100vh;
    background: white;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    padding: 50px 0;
`;

const ProfileContainer = styled.div`
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    width: 600px;
    padding: 40px;
    animation: ${fadeIn} 0.5s ease forwards;
    margin: 0 20px;
    position: relative;
`;

const Title = styled.h1`
    font-size: 28px;
    color: #333;
    text-align: center;
    margin-bottom: 30px;
    font-weight: 700;
`;

const UserDetail = styled.p`
    font-size: 18px;
    margin: 10px 0;
    color: #555;
    strong {
        color: #333;
    }
`;

const ErrorBox = styled.div`
    background-color: #ffebee;
    color: #c62828;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    border: 3px solid #c62828;
`;

const SuccessPopup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #4caf50;
    color: #fff;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 9999;
    text-align: center;
    animation: ${fadeIn} 0.3s ease forwards;
`;

const ProgressLine = styled.div`
    width: 80%;
    height: 6px;
    background: rgba(255,255,255,0.7);
    border-radius: 3px;
    margin: 10px auto 0 auto;
    overflow: hidden;
    position: relative;

    &::after {
        content: "";
        display: block;
        height: 100%;
        background: #fff;
        animation: ${countdown} 3s linear forwards;
    }
`;

const ProfileImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 20px auto;
    display: block;
    object-fit: cover;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
`;

const ToggleButton = styled.button`
    padding: 14px 22px;
    background-color: #2196f3;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;

    &:hover {
        background-color: #1976d2;
    }

    &::after {
        content: "${props => (props.open ? '▲' : '▼')}";
        font-size: 14px;
    }
`;

const LogoutButton = styled(ToggleButton)`
    background-color: #f44336;
    &:hover {
        background-color: #d32f2f;
    }
    &::after {
        content: '';
    }
`;

const FormContainer = styled.div`
    overflow: hidden;
    animation: ${slideDown} 0.4s ease forwards;
    margin-bottom: 20px;
`;

const FormCard = styled.form`
    background: #fafafa;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    padding: 30px;
    margin-bottom: 20px;
    position: relative;
`;

const FormTitle = styled.h3`
    font-size: 20px;
    margin-bottom: 15px;
    color: #333;
    font-weight: 700;
`;

const Instruction = styled.p`
    font-size: 15px;
    color: #777;
    margin-bottom: 20px;
`;

// Adjusted spacing here
const FormLayout = styled.div`
    display: flex;
    gap: 30px;
`;

const FormFields = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    background-color: #fff;
    transition: border-color 0.3s;
    &:focus {
        border-color: #90caf9;
        outline: none;
    }
`;

const FieldError = styled.p`
    color: #c62828;
    font-size: 14px;
    margin-top: -5px;
    margin-bottom: 10px;
    font-weight: 600;
`;

const SaveButton = styled.button`
    padding: 12px 24px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: background-color 0.3s;
    align-self: start;
    &:hover {
        background-color: #43a047;
    }
`;

const FormAdvice = styled.div`
    flex: 0 0 220px;
    background: #fffde7;
    border: 1px solid #ffecb3;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    border-radius: 8px;
    padding: 15px;
    font-size: 14px;
    color: #444;
    display: ${props => props.visible ? 'block' : 'none'};
`;

const UserProfile = ({ userId }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [globalError, setGlobalError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // State controlling form visibility
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showSecurityForm, setShowSecurityForm] = useState(false);

    // Email form state
    const [newEmail, setNewEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailFocused, setEmailFocused] = useState(false); // Tracks if the email field is focused

    // Password form state
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordFocused, setPasswordFocused] = useState(false); // If any password field is focused

    // Security form state
    const [newSecurityQuestion, setNewSecurityQuestion] = useState("");
    const [newSecurityAnswer, setNewSecurityAnswer] = useState("");
    const [securityError, setSecurityError] = useState("");
    const [securityFocused, setSecurityFocused] = useState(false); // If any security field is focused

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const data = await UserService.getUserById(userId);
                setUserData(data);
            } catch (err) {
                setGlobalError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const resetFormErrors = () => {
        setEmailError("");
        setPasswordError("");
        setSecurityError("");
        setGlobalError("");
    };

    const resetMessages = () => {
        setGlobalError("");
        setSuccess("");
    };

    const toggleEmailForm = () => {
        setShowEmailForm(!showEmailForm);
        setShowPasswordForm(false);
        setShowSecurityForm(false);
        resetFormErrors();
    };

    const togglePasswordForm = () => {
        setShowPasswordForm(!showPasswordForm);
        setShowEmailForm(false);
        setShowSecurityForm(false);
        resetFormErrors();
    };

    const toggleSecurityForm = () => {
        setShowSecurityForm(!showSecurityForm);
        setShowEmailForm(false);
        setShowPasswordForm(false);
        resetFormErrors();
    };

    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        resetMessages();
        setEmailError("");

        if (!isValidEmail(newEmail)) {
            setEmailError("Please enter a valid email address with '@' and a proper domain.");
            return;
        }

        try {
            await UserService.updateEmail(userId, newEmail);
            setSuccess("Email updated successfully!");
            setUserData((prevData) => ({ ...prevData, email: newEmail }));
            setNewEmail("");
            setShowEmailForm(false);
        } catch (err) {
            if (err.message.includes("already exists")) {
                setEmailError("A user with this email already exists.");
            } else {
                setGlobalError(err.message);
            }
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        resetMessages();
        setPasswordError("");

        if (!oldPassword) {
            setPasswordError("Old password is required.");
            return;
        }

        if (!isValidPassword(newPassword)) {
            setPasswordError("Must have uppercase, number, special char, and ≥ 8 chars in length.");
            return;
        }

        if (newPassword !== repeatPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        try {
            // Old password verification happens server-side
            await UserService.updatePassword(userId, oldPassword, newPassword);
            setSuccess("Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
            setRepeatPassword("");
            setShowPasswordForm(false);
        } catch (err) {
            if (err.message.includes("Old password is incorrect")) {
                setPasswordError("Old password is incorrect.");
            } else {
                setGlobalError(err.message);
            }
        }
    };

    const handleUpdateSecurity = async (e) => {
        e.preventDefault();
        resetMessages();
        setSecurityError("");

        if (!newSecurityQuestion.trim() || !newSecurityAnswer.trim()) {
            setSecurityError("Both security question and answer are required.");
            return;
        }

        try {
            await UserService.updateSecurity(userId, newSecurityQuestion, newSecurityAnswer);
            setSuccess("Security question and answer updated successfully!");
            setUserData((prevData) => ({ ...prevData, securityQuestion: newSecurityQuestion }));
            setNewSecurityQuestion("");
            setNewSecurityAnswer("");
            setShowSecurityForm(false);
        } catch (err) {
            setGlobalError(err.message);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <GlobalStyle />
            {success && (
                <SuccessPopup>
                    {success}
                    <ProgressLine />
                </SuccessPopup>
            )}
            <ProfilePageWrapper>
                <ProfileContainer>
                    <Title>User Profile</Title>
                    {globalError && <ErrorBox>{globalError}</ErrorBox>}
                    {isLoading ? (
                        <p style={{ color: '#fff', fontSize: '18px', textAlign: 'center' }}>Loading user data...</p>
                    ) : (
                        userData && (
                            <>
                                <ProfileImage
                                    src="https://png.pngtree.com/png-vector/20221203/ourmid/pngtree-cartoon-style-female-user-profile-icon-vector-illustraton-png-image_6489286.png"
                                    alt="User Profile"
                                />
                                <UserDetail><strong>Name:</strong> {userData.name}</UserDetail>
                                <UserDetail><strong>Email:</strong> {userData.email}</UserDetail>
                                <UserDetail><strong>Phone:</strong> {userData.phoneNumber || "N/A"}</UserDetail>
                                <UserDetail><strong>Security Question:</strong> {userData.securityQuestion || "N/A"}</UserDetail>

                                <ButtonRow>
                                    <ToggleButton onClick={toggleEmailForm} open={showEmailForm}>
                                        📧 Change Email
                                    </ToggleButton>
                                    <ToggleButton onClick={togglePasswordForm} open={showPasswordForm}>
                                        🔒 Change Password
                                    </ToggleButton>
                                    <ToggleButton onClick={toggleSecurityForm} open={showSecurityForm}>
                                        ❓ Change Security Q&A
                                    </ToggleButton>
                                    <LogoutButton onClick={handleLogout}>🚪 Logout</LogoutButton>
                                </ButtonRow>

                                {/* Email Form */}
                                {showEmailForm && (
                                    <FormContainer>
                                        <FormCard onSubmit={handleUpdateEmail}>
                                            <FormTitle>Update Email</FormTitle>
                                            <Instruction>Enter a valid email address to update your account email.</Instruction>
                                            <FormLayout>
                                                <FormFields>
                                                    <InputField
                                                        type="email"
                                                        placeholder="New Email"
                                                        value={newEmail}
                                                        onChange={(e) => setNewEmail(e.target.value)}
                                                        onFocus={() => setEmailFocused(true)}
                                                        onBlur={() => setEmailFocused(false)}
                                                        required
                                                    />
                                                    {emailError && <FieldError>{emailError}</FieldError>}
                                                    <SaveButton type="submit">Save</SaveButton>
                                                </FormFields>
                                                <FormAdvice visible={emailFocused}>
                                                    <p><strong>Email Advice:</strong></p>
                                                    <p>- Must include '@'</p>
                                                    <p>- Valid domain (e.g. gmail.com)</p>
                                                </FormAdvice>
                                            </FormLayout>
                                        </FormCard>
                                    </FormContainer>
                                )}

                                {/* Password Form */}
                                {showPasswordForm && (
                                    <FormContainer>
                                        <FormCard onSubmit={handleUpdatePassword}>
                                            <FormTitle>Update Password</FormTitle>
                                            <Instruction>Your password must contain uppercase, number, special char, and be at least 8 chars long.</Instruction>
                                            <FormLayout>
                                                <FormFields>
                                                    <InputField
                                                        type="password"
                                                        placeholder="Old Password"
                                                        value={oldPassword}
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                        onFocus={() => setPasswordFocused(true)}
                                                        onBlur={() => setPasswordFocused(false)}
                                                        required
                                                    />
                                                    <InputField
                                                        type="password"
                                                        placeholder="New Password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        onFocus={() => setPasswordFocused(true)}
                                                        onBlur={() => setPasswordFocused(false)}
                                                        required
                                                    />
                                                    <InputField
                                                        type="password"
                                                        placeholder="Repeat New Password"
                                                        value={repeatPassword}
                                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                                        onFocus={() => setPasswordFocused(true)}
                                                        onBlur={() => setPasswordFocused(false)}
                                                        required
                                                    />
                                                    {passwordError && <FieldError>{passwordError}</FieldError>}
                                                    <SaveButton type="submit">Save</SaveButton>
                                                </FormFields>
                                                <FormAdvice visible={passwordFocused}>
                                                    <p><strong>Password Advice:</strong></p>
                                                    <p>- Old password: your current password</p>
                                                    <p>- New password: Uppercase, number, special char</p>
                                                    <p>- Length ≥ 8</p>
                                                    <p>- Passwords must match</p>
                                                </FormAdvice>
                                            </FormLayout>
                                        </FormCard>
                                    </FormContainer>
                                )}

                                {/* Security Q&A Form */}
                                {showSecurityForm && (
                                    <FormContainer>
                                        <FormCard onSubmit={handleUpdateSecurity}>
                                            <FormTitle>Update Security Question & Answer</FormTitle>
                                            <Instruction>Set a new question and answer that only you know, so you can recover your account if you forget your password.</Instruction>
                                            <FormLayout>
                                                <FormFields>
                                                    <InputField
                                                        type="text"
                                                        placeholder="New Security Question"
                                                        value={newSecurityQuestion}
                                                        onChange={(e) => setNewSecurityQuestion(e.target.value)}
                                                        onFocus={() => setSecurityFocused(true)}
                                                        onBlur={() => setSecurityFocused(false)}
                                                        required
                                                    />
                                                    <InputField
                                                        type="text"
                                                        placeholder="New Security Answer"
                                                        value={newSecurityAnswer}
                                                        onChange={(e) => setNewSecurityAnswer(e.target.value)}
                                                        onFocus={() => setSecurityFocused(true)}
                                                        onBlur={() => setSecurityFocused(false)}
                                                        required
                                                    />
                                                    {securityError && <FieldError>{securityError}</FieldError>}
                                                    <SaveButton type="submit">Save</SaveButton>
                                                </FormFields>
                                                <FormAdvice visible={securityFocused}>
                                                    <p><strong>Security Q&A Advice:</strong></p>
                                                    <p>- Choose a secret question</p>
                                                    <p>- Answer only you know</p>
                                                    <p>- Avoid obvious info</p>
                                                </FormAdvice>
                                            </FormLayout>
                                        </FormCard>
                                    </FormContainer>
                                )}
                            </>
                        )
                    )}
                </ProfileContainer>
            </ProfilePageWrapper>
        </>
    );
};

export default UserProfile;
