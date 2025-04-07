// import axios from "axios";

// // const API_URL = "https://localhost:5001/api/projects";
// const API_URL = "http://10.0.2.2:5001/api/projects"; // Emulator only


// export const fetchProjects = async () => {
//     try {
//         const response = await axios.get(API_URL);
//         return response.data;
//     } catch (error) {
//         console.log("Error fetching projects : ", error);
//         return [];
//     }
// };

// export const fetchPublicProjects = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/public`);
//         return response.data;
//     } catch (error) {
//         console.log("Error fetching projects : ", error);
//         return [];
//     }
// };

// export const fetchUserProjects = async (userId) => {
//   try {
//     console.log("Fetching projects for user:", userId);
//     const response = await axios.get(`${API_URL}/user/${userId}/projects`);
//     console.log("API response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user projects:", error.response?.data || error.message);
//     return [];
//   }
// };



import axios from "axios";

// const API_URL = "https://localhost:5001/api/projects";
const API_URL = "http://10.0.2.2:5001/api/projects"; // Emulator only

export const addProject = async (userId, projectData) => {
  console.log("API URL:", `${API_URL}/add-project/${userId}`);
  console.log("Project Data:", projectData);
  try {
    const response = await axios.post(`${API_URL}/add-project/${userId}`, projectData);
    return response.data;
  } catch (error) {
    console.log("Add Project Error:", error.response ? error.response.data : error.message);
    return { error: error.response?.data?.message || "Add Project Failed" };
  }
};

export const fetchProjects = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log("Error fetching projects : ", error);
        return [];
    }
};

export const fetchPublicProjects = async () => {
    try {
        const response = await axios.get(`${API_URL}/public`);
        return response.data;
    } catch (error) {
        console.log("Error fetching projects : ", error);
        return [];
    }
};

export const fetchUserProjects = async (userId) => {
  try {
    console.log("Fetching projects for user:", userId);
    const response = await axios.get(`${API_URL}/my-projects/${userId}`);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user projects:", error.response?.data || error.message);
    return [];
  }
};

export const fetchUserPublicProjects = async (userId) => {
  try {
    console.log("Fetching projects for user:", userId);
    const response = await axios.get(`${API_URL}/my-public-projects/${userId}`);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user projects:", error.response?.data || error.message);
    return [];
  }
}
