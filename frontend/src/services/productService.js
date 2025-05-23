import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchProducts() {
    try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        return await res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

