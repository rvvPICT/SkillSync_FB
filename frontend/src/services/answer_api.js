// import axios from "axios";
// //import mongoose from "mongoose";


// const API_URL = "http://10.0.2.2:5001/api/answer";

// export const postAnswer = async (questionId, answerData) => {
//     try {
//         const response = await axios.post(
//             `${API_URL}/question/${questionId}/answer`, 
//             answerData);
//         //     {
//         //         headers: {
//         //             'Authorization': `Bearer ${await getAuthToken()}`
//         //         }
//         //     }
//         // );
//         return response.data;
//     } catch (error) {
//         console.log("Add answer Error:", error.response ? error.response.data : error.message);
//         return { error: error.response?.data?.message || "Add answer Failed" };
//     }
// };
import axios from "axios";

// Make sure this matches your backend URL and route structure
const API_URL = "http://10.0.2.2:5001/api/answer";

export const postAnswer = async (questionId, answerData) => {
  try {
    // Log the complete request being made
    console.log(`Request URL: ${API_URL}/question/${questionId}/answer`);
    console.log("Request Payload:", JSON.stringify(answerData));
    
    const response = await axios.post(
      `${API_URL}/question/${questionId}/answer`,
      answerData
    );
    
    console.log("Success Response:", response.data);
    return response.data;
  } catch (error) {
    // More detailed error logging
    console.log("Error Status:", error.response?.status);
    console.log("Error Data:", error.response?.data);
    console.log("Error Message:", error.message);
    
    // Return more specific error information
    return { 
      error: error.response?.data?.message || 
             error.response?.data || 
             error.message || 
             "Add answer Failed" 
    };
  }
};