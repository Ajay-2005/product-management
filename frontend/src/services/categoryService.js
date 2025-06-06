

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchCategories() {
    try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        return await res.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}
export async function addCategory(name, parentCategoryName = null) {
  try {
    console.log("Adding category:", { name, parentCategoryName });
    const res = await fetch(`${API_BASE_URL}/add-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, parentCategoryName }),
    });
    console.log("Response from addCategory:", res); // Debugging line

    if (!res.ok) throw new Error("Failed to add category");
    return await res.json();
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
}
