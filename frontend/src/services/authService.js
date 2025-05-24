const API_URL = "http://localhost:5000/api";

export const handleSignup = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",  // <-- this makes the browser send cookies
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    throw error || { message: "Signup failed" };
  }
};

export const handleLogin = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    throw error || { message: "Login failed" };
  }
};
