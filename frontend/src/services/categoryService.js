import axios from 'axios';


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
