import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { useAuth } from "../auth/AuthContext";

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    width: 50%;
    margin: 50px auto;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const UserDetail = styled.p`
    font-size: 18px;
    margin: 10px 0;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 16px;
`;

const SuccessMessage = styled.p`
    color: green;
    font-size: 16px;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    width: 80%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px 0;

    &:hover {
        background-color: #0056b3;
    }
`;

const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 20px 0;
`;

const UserProfile = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const data = await UserService.getUserById(userId);
                setUserData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleUpdatePassword = async (e) => {
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
            setSuccess("");
            await UserService.recoverPassword(
                userData.email,
                userData.securityQuestion,
                securityAnswer,
                newPassword
            );
            setSuccess("Password updated successfully!");
            setNewPassword("");
            setRepeatPassword("");
            setSecurityAnswer("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <ProfileContainer>
            <Title>User Profile</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            {isLoading ? (
                <p>Loading user data...</p>
            ) : (
                userData && (
                    <>
                        <ProfileImage
                            src="https://png.pngtree.com/png-vector/20221203/ourmid/pngtree-cartoon-style-female-user-profile-icon-vector-illustraton-png-image_6489286.png"
                            alt="User Profile"
                        />
                        <UserDetail>
                            <strong>Name:</strong> {userData.name}
                        </UserDetail>
                        <UserDetail>
                            <strong>Email:</strong> {userData.email}
                        </UserDetail>
                        <UserDetail>
                            <strong>Phone:</strong> {userData.phoneNumber || "N/A"}
                        </UserDetail>
                        <UserDetail>
                            <strong>Security Question:</strong>{" "}
                            {userData.securityQuestion || "N/A"}
                        </UserDetail>

                        {/* Update Password Section */}
                        <form onSubmit={handleUpdatePassword}>
                            <Input
                                type="text"
                                placeholder="Answer to Security Question"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
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
                            <Button type="submit">Update Password</Button>
                        </form>

                        {/* Logout */}
                        <Button onClick={handleLogout}>Logout</Button>
                    </>
                )
            )}
        </ProfileContainer>
    );
};

export default UserProfile;
