import axios from "axios";

const API_BASE_URL = "https://10.154.220.92:5000/api/users";

const UserService = {
    authenticateUser: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/authenticate`, { email, password });
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data || "Authentication failed");
            } else if (error.request) {
                throw new Error("Network error: Could not reach the server");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    },

    getSecurityQuestion: async (email) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${email}/security-question`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || "Failed to fetch security question.");
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
            throw new Error(error.response?.data || "Failed to fetch user details.");
        }
    },

    getUserById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || "Failed to fetch user details.");
        }
    },

    // Update user's email
    updateEmail: async (id, newEmail) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}/email`, { newEmail });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || "Failed to update email.");
        }
    },

    // Update user's password
    updatePassword: async (id, oldPassword, newPassword) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}/password`, {
                oldPassword,
                newPassword
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || "Failed to update password.");
        }
    },


    // Update user's security question and answer
    updateSecurity: async (id, newSecurityQuestion, newSecurityAnswer) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}/security`, {
                newSecurityQuestion,
                newSecurityAnswer
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || "Failed to update security question/answer.");
        }
    },
};

export default UserService;
