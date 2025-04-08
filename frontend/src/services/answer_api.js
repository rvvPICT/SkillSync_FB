import axios from "axios";
import mongoose from "mongoose";


const API_URL = "http://10.0.2.2:5001/api/answer";

export const postAnswer = async (questionId, answerData) => {
    try {
        const response = await axios.post(
            `${API_URL}/question/${questionId}/answer`, 
            answerData, 
            {
                headers: {
                    'Authorization': `Bearer ${await getAuthToken()}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log("Add answer Error:", error.response ? error.response.data : error.message);
        return { error: error.response?.data?.message || "Add answer Failed" };
    }
};
