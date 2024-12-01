const BASE_URL =
  "https://cryptocamguard.azurewebsites.net/api/Photo/EncryptDecrypt";

export const encryptImage = async (formData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error encrypting image", error);
    throw error;
  }
};
