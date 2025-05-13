// src/api/userData.js
import axios from "axios";

export async function fetchUserData(username) {
  if (!navigator.onLine) {
    console.warn("No internet connection. Redirecting...");
    window.location.href = "/Nointernet";
    return null;
  }

  try {
    const response = await axios.get(
      `https://nfc-back-1-zlbp.onrender.com/api/cards/username/${username}`,
      {
        timeout: 10000,
      }
    );

    if (response.status === 200) {
      return response.data || null;
    } else {
      console.warn(`Unexpected response status: ${response.status}`);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error occurred:", error.message);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);

        if (error.response.status === 404) {
          window.location.href = "/Error404";
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      }
    } else {
      console.error("Non-Axios error occurred:", error.message);
    }
    throw error;
  }
}
