import axios from "axios";
//import mongoose from "mongoose";


const API_URL = "http://10.0.2.2:5001/api/qna";

// Signup API
export const postQuestion = async (questionData) => {
    try {
        // const response = await axios.post(`${API_URL}/question`, questionData);
        const response = await axios.post(`${API_URL}/question`, {questionData});
        //export const postQuestion = async (userId,questionData) => {
        return response.data;
    } catch (error) {
        console.log("Add question Error:", error.response ? error.response.data : error.message);
        return { error: error.response?.data?.message || "Add question Failed" };
    }
};


// In your API service file
// export const postQuestion = async (questionData) => {
//     try {
//       // Include authentication token in headers
//       const response = await axios.post(`${API_URL}/question`, questionData, {
//         headers: {
//           'Authorization': `Bearer ${await getAuthToken()}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       console.log("Add question Error:", error.response ? error.response.data : error.message);
//       return { error: error.response?.data?.message || "Add question Failed" };
//     }
//   };

// import axios from 'axios';

//const BASE_URL = "http://10.0.2.2:5001/api/qna";  // Change this to your backend URL

export const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/viewQuestion`);
      return response.data; 
    } catch (error) {
      // More detailed error logging
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error("Error fetching questions - Status:", error.response.status);
        console.error("Error data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error fetching questions - No response received");
      } else {
        // Something happened in setting up the request
        console.error("Error fetching questions:", error.message);
      }
      return []; // Return empty array on any error
    }
  };
  
