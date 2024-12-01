// import axios from "axios";

// const BASE_URL = " https://cryptocamguard.azurewebsites.net/api/User";

// export const login = async (userData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/login`, userData);
//     return response.data;
//   } catch (error) {
//     console.log(
//       "Error while signing in:",
//       error.response?.data || error.message
//     );
//   }
// };

// export const register = async (userData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/signup`, userData);
//     return response.data;
//   } catch (error) {
//     console.log(
//       "Error while signing up: ",
//       error.response?.data || error.message
//     );
//   }
// };

const BASE_URL = "https://cryptocamguard.azurewebsites.net/api/User";

export const login = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while signing in");
    }

    return await response.json();
  } catch (error) {
    console.log("Error while signing in: ", error.message);
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error while signing up");
    }

    return await response.json();
  } catch (error) {
    console.log("Error while signing up: ", error.message);
  }
};
