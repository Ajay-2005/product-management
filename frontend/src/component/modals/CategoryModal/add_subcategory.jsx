import React, { useState, useEffect } from "react";
import "./add_category.css";
import { addCategory } from "../../../services/categoryService";
import { fetchCategories } from "../../../services/categoryService";

const AddSubcategoryModal = ({ isOpen, onClose, onAdd }) => {
    const [subcategoryName, setSubcategoryName] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                const topLevelCategories = (data.categories || []).filter(
                    (cat) => !cat.parentCategory
                );
                setCategories(topLevelCategories);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };

        if (isOpen) loadCategories();
    }, [isOpen]);

    const handleAdd = async () => {
        if (!subcategoryName || !parentCategory) return;

        try {
            const result = await addCategory(subcategoryName, parentCategory);
            onAdd(result);
            setSubcategoryName("");
            setParentCategory("");
        } catch (error) {
            console.error("Error adding subcategory:", error);
        }
    };

    const handleDiscard = () => {
        setSubcategoryName("");
        setParentCategory("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Add Subcategory</h2>
                <select
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                    className="dropdown-select"
                >
                    <option value="">Select Parent Category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Enter subcategory name"
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                />

                <div className="modal-buttons">
                    <button className="add-btn" onClick={handleAdd}>Add</button>
                    <button className="discard-btn" onClick={handleDiscard}>Discard</button>
                </div>
            </div>
        </div>
    );
};

export default AddSubcategoryModal;
