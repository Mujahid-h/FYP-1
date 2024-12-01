BASE_URL = "https://cryptocamguard.azurewebsites.net/api/Photo";

// Fetch Images with UserId using Fetch API
export const fetchImagesWithIds = async (userId, encrypted) => {
  try {
    const response = await fetch(
      `${BASE_URL}/GetImages?userId=${userId}&isEncrypted=${encrypted}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images", error);
    throw error;
  }
};

// Upload Image with UserId using Fetch API
export const uploadImagesWithIds = async (image, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/Save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set headers if needed
      },
      body: JSON.stringify({
        imageLink: image,
        userId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Error uploading image");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading image", error);
    throw error;
  }
};
