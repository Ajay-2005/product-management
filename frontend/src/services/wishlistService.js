
const API_BASE_URL = "http://localhost:5000/api";

export async function addToWishlist(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/add-wishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ productId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        throw error;
    }
}

export async function removeFromWishlist(productId) {
    console.log("Removing from wishlist:", productId);
    try {
        const response = await fetch(`${API_BASE_URL}/remove-wishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ productId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        return await response.json();
    }
    catch (error) {
        console.error("Error removing from wishlist:", error);
        throw error;
    }
}
export async function getWishList() {
    try {
        const response = await fetch(`${API_BASE_URL}/get-wishlist`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        throw error;
    }
}