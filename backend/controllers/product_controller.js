import { getProduct } from "../models/index.js";
import cloudinary from "../config/cloudinary.js";


export async function addProduct(req, res) {
    try {
        const { name, category, description, price, variants } = req.body;
        const files = req.files;

        if (!files) {
            return res.status(400).json({ success: false, message: 'Please upload atleast one image' });
        }

        const uploadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                stream.end(file.buffer);
            });
        });

        const imageUrls = await Promise.all(uploadPromises);


        const productsCollection = getProduct();

        const productData = {
            name,
            category,
            description,
            price: Number(price),
            variants: variants ? JSON.parse(variants) : [],
            images: imageUrls,
            createdAt: new Date(),
        };

        const result = await productsCollection.insertOne(productData);

        res.status(201).json({ success: true, productId: result.insertedId, images: imageUrls });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export async function listProducts(req, res) {
    try {
        const productsCollection = getProduct();
        const products = await productsCollection.find().toArray();

        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}