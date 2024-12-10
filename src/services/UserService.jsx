import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/users";

const UserService = {
    authenticateUser: async (email, password) => {
        try {
            console.log("Sending login request with:", { email, password });
            const response = await axios.post("http://localhost:5000/api/users/authenticate", {
                email,
                password,
            });
            return response.data; // Return user data if authentication is successful
        } catch (error) {
            if (error.response) {
                console.error("Server error:", error.response.data);
                throw new Error(error.response.data || "Authentication failed");
            } else if (error.request) {
                console.error("Network error:", error.message);
                throw new Error("Network error: Could not reach the server");
            } else {
                console.error("Unexpected error:", error.message);
                throw new Error("An unexpected error occurred");
            }
        }
    },



    getSecurityQuestion: async (email) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${email}/security-question`);
            return response.data; // The security question
        } catch (error) {
            console.error("Error fetching security question:", error.response?.data || error.message);
            throw new Error(error.response?.data || "Failed to fetch security question.");
        }
    },


    recoverPassword: async (email, securityQuestion, securityAnswer, newPassword) => {
        try {
            const response = await axios.post("http://localhost:5000/api/users/recover-password", {
                email,
                securityQuestion,
                securityAnswer,
                newPassword,
            });
            return response.data; // Return success message
        } catch (error) {
            console.error("Error recovering password:", error.response?.data || error.message);
            throw new Error(error.response?.data || "Password recovery failed");
        }
    },


    getUserDetails: async (email) => {
        if (!email) {
            throw new Error("Email is required to fetch user details.");
        }
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${email}/security-question`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch user details:", error.response?.data || error.message);
            throw new Error(error.response?.data || "Failed to fetch user details.");
        }
    },

};

export default UserService;
