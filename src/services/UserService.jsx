import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/users";

const UserService = {
    authenticateUser: async (email, password) => {
        try {
            console.log("Sending login request with:", { email, password });
            const response = await axios.post(`${API_BASE_URL}/authenticate`, {
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
            const response = await axios.get(`${API_BASE_URL}/${email}/security-question`);
            return response.data; // The security question
        } catch (error) {
            console.error("Error fetching security question:", error.response?.data || error.message);
            throw new Error(error.response?.data || "Failed to fetch security question.");
        }
    },

    recoverPassword: async (email, securityQuestion, securityAnswer, newPassword) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/recover-password`, {
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
            const response = await axios.get(`${API_BASE_URL}/${email}/security-question`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch user details:", error.response?.data || error.message);
            throw new Error(error.response?.data || "Failed to fetch user details.");
        }
    },

    getUserById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data; // Return user details
        } catch (error) {
            console.error("Error fetching user details by ID:", error.response?.data || error.message);
            throw new Error(error.response?.data || "Failed to fetch user details.");
        }
    },

    // New method: Update user's email
    updateEmail: async (id, email) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}/email`, { email });
            return response.data;
        } catch (error) {
            console.error("Error updating email:", error.response?.data || error.message);
            throw new Error(error.response?.data || "Failed to update email.");
        }
    },

    // New method: Update user's password
    updatePassword: async (id, password) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}/password`, { password });
            return response.data;
        } catch (error) {
            console.error("Error updating password:", error.response?.data || error.message);
            throw new Error(error.response?.data || "Failed to update password.");
        }
    },
    verifySecurityAnswer: async (userId, securityAnswer) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/${userId}/verify-security-answer`, { securityAnswer });
            return response.data.isValid; // Assumes API returns { isValid: true/false }
        } catch (error) {
            console.error("Error verifying security answer:", error.response?.data || error.message);
            throw new Error(error.response?.data || "Failed to verify security answer.");
        }
    },

};

export default UserService;
