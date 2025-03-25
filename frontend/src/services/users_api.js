import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:5001/api/users";

// Helper function to get token
const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem("authToken");
    return { headers: { Authorization: `Bearer ${token}` } };
};

// Signup API
export const signup_post = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        console.log("Signup Error:", error.response ? error.response.data : error.message);
        return { error: error.response?.data?.message || "Signup Failed" };
    }
};

// Login API
export const login_post = async ({ emailOrUsername, password }) => {
    try {
        // const response = await axios.post(`${API_URL}/login`, userData);
        const response = await axios.post(`${API_URL}/login`, { emailOrUsername, password });
        const { token } = response.data;
        await AsyncStorage.setItem("authToken", token);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || "Login failed" };
    }
};

export const editProf_post = async (userId, profileData) => {
    try {
        // const headers = getAuthHeaders();
        const response = await axios.put(`${API_URL}/edit-profile/${userId}`, profileData);
        return response.data;
    } catch (error) {
        console.log("Edit Profile Failed: ", error.response ? error.response.data : error.message);
        return { error: error.response?.data?.message || "Edit Profile Failed" };
    }
}

// Fetch all users (Protected)
export const fetchAllUsers = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_URL}/all`, headers);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.response ? error.response.data : error.message);
        return [];
    }
};

// Fetch mentors (Protected)
export const fetchAllMentors = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_URL}/mentors`, headers);
        return response.data;
    } catch (error) {
        console.error("Error fetching mentors:", error);
        return [];
    }
};

// Fetch user by ID (Protected)
export const fetchUserById = async (userId) => {
    if (!userId) return null;
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${API_URL}/${userId}`, headers);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

// Update user avatar (Protected)
export const updateUserAvatar = async (userId, avatarIndex) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.put(`${API_URL}/update-avatar/${userId}`, { avatar: avatarIndex }, headers);
        return response.data;
    } catch (error) {
        console.error("Failed to update avatar:", error);
        throw error;
    }
};
