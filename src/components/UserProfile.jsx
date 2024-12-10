import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { ProfileContainer, Title, ErrorMessage } from "../styles";

const UserProfile = ({email}) => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await UserService.getUserDetails(email);
                setUserData(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (email) {
            fetchData();
        }
    }, [email]);


    return (
        <ProfileContainer>
            <Title>User Profile</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {userData ? (
                <>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </ProfileContainer>
    );
};

export default UserProfile;
