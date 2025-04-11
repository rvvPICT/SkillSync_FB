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


export const sendInvite = async (projectId , userToInvite , token) => {
  try {
    console.log("In project_Api for sending invites !") ;
    const res = await axios.post(`${API_URL}/invite` , {projectId , userIdToInvite:userToInvite} , {
      headers : {
        Authorization : `Bearer ${token}` ,
      },
    }
  );
  }catch(error){
    console.log("Error in sending invite :" , error.response?.data || error.message) ;
    throw error ;
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


// export const apply = async(projectId, userId) => {
//   try {
//     console.log(`${userId} Applying For project: ${projectId}`);
//     await axios.post(`${API_URL}/apply`,{ projectId, userId });
//     console.log("Apply response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.log("Error in applying the project:", error);
    
//     // Get detailed error information
//     let errorMessage;
    
//     // Check if there's a response with data from the server
//     if (error.response && error.response.data) {
//       // If the server returned an error object or message
//       if (typeof error.response.data === 'object') {
//         errorMessage = error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
//       } else {
//         errorMessage = error.response.data;
//       }
//     } else if (error.message) {
//       // If it's a general Axios error
//       errorMessage = error.message;
//     } else {
//       // Fallback error message
//       errorMessage = "Failed to apply for the project";
//     }
    
//     // Throw error with the extracted message
//     throw new Error(errorMessage);
// }
// };

export const apply = async (projectId, userId) => {
  try {
    console.log(`${userId} Applying For project: ${projectId}`);

    // ✅ Save response
    const response = await axios.post(`${API_URL}/apply`, { projectId, userId });

    console.log("✅ Apply response:", response.data);
    return response; // or return response.data if you want to access .msg directly
  } catch (error) {
    console.log("❌ Error in applying the project:", error);

    let errorMessage;

    if (error.response && error.response.data) {
      if (typeof error.response.data === 'object') {
        errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          JSON.stringify(error.response.data);
      } else {
        errorMessage = error.response.data;
      }
    } else if (error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = "Failed to apply for the project";
    }

    throw new Error(errorMessage);
  }
};
