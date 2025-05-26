import React, { useState } from "react";
import "./add_product.css";
import { addProduct } from "../../../services/productService";
import { fetchCategories } from "../../../services/categoryService";
import { useEffect } from "react";
import { use } from "react";
const AddProductModal = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [variants, setVariants] = useState([{ ram: "", price: "", qty: 1 }]);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data.categories || []);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };

        if (isOpen) loadCategories();
    }, [isOpen]);

    const handleVariantChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = field === "qty" ? parseInt(value) : value;
        setVariants(updated);
    };

    const addVariant = () => {
        setVariants([...variants, { ram: "", price: "", qty: 1 }]);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            title,
            description,
            categories,
            variants,
            images,
        };
        try {
            const newProduct = await addProduct(productData);
            onAdd(newProduct);
            onClose();
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Variants:</label>
                    {variants.map((variant, index) => (
                        <div className="variant-row" key={index}>
                            <input
                                type="text"
                                placeholder="RAM"
                                value={variant.ram}
                                onChange={(e) =>
                                    handleVariantChange(index, "ram", e.target.value)
                                }
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={variant.price}
                                onChange={(e) =>
                                    handleVariantChange(index, "price", e.target.value)
                                }
                            />
                            <div className="qty-control">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleVariantChange(index, "qty", Math.max(1, variant.qty - 1))
                                    }
                                >
                                    -
                                </button>
                                <span>{variant.qty}</span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleVariantChange(index, "qty", variant.qty + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}

                    <div class="add-variant-container">
                        <button type="button" onClick={addVariant} className="add-variant-btn">
                            Add Variant
                        </button>
                    </div>


                    <label>Category</label>
                    <select>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />

                    <label>Upload Image:</label>
                    <div className="image-preview-box">
                        {images.map((file, idx) => (
                            <img
                                key={idx}
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="preview-img"
                            />
                        ))}
                        <label className="upload-box">
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                            />
                            +
                        </label>
                        <label className="upload-box">
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                            />
                            +
                        </label>
                        <label className="upload-box">
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                            />
                            +
                        </label>
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">ADD</button>
                        <button type="button" onClick={onClose} className="btn-secondary">DISCARD</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
