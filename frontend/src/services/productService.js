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

export async function addProduct(productData) {
    try {
        const { title, description, category, variants, images } = productData;

        const formData = new FormData();
        formData.append("name", title);
        formData.append("description", description);
        formData.append("category", category)
        formData.append("variants", JSON.stringify(variants));

        images.forEach((image) => {
            formData.append("images", image);
        });

        const res = await fetch(`${API_BASE_URL}/add-product`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        if (!res.ok) throw new Error("Failed to add product");
        return await res.json();
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
}

export async function getProductById(productId) {
    try {
        const res = await fetch(`${API_BASE_URL}/product/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        return await res.json();
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
}
