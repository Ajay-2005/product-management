import { getProduct } from "../models/index.js";
import cloudinary from "../config/cloudinary.js";


export async function addProduct(req, res) {
    try {
        const { name, category, subcategory, description, variants } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, message: 'Please upload at least one image' });
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

        let parsedVariants = [];
        try {
            parsedVariants = variants ? JSON.parse(variants) : [];
        } catch (err) {
            return res.status(400).json({ success: false, message: 'Invalid variants format' });
        }

        const productsCollection = getProduct();

        const productData = {
            name,
            category,
            subcategory,
            description,
            variants: parsedVariants,
            images: imageUrls,
            createdAt: new Date(),
        };

        const result = await productsCollection.insertOne(productData);

        res.status(201).json({
            success: true,
            productId: result.insertedId,
            images: imageUrls
        });

    } catch (error) {
        console.error('Error adding product:', error);
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