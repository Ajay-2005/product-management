import React, { useState } from "react";
import "./add_category.css";
import { addCategory } from "../../../services/categoryService";

const AddCategoryModal = ({ isOpen, onClose, onAdd }) => {
    const [categoryName, setCategoryName] = useState("");

    const handleAdd = async () => {
        try {
            const result = await addCategory(categoryName);
            onAdd(result);
            setCategoryName("");
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const handleDiscard = () => {
        setCategoryName("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="category-modal-backdrop">
            <div className="category-modal-content">
                <h2>Add Category</h2>

                <input
                    type="text"
                    placeholder="Enter category name"
                    name="category"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="category-modal-input"
                />

                <div className="category-modal-buttons">
                    <button className="category-modal-add-btn" onClick={handleAdd}>
                        Add
                    </button>
                    <button className="category-modal-discard-btn" onClick={handleDiscard}>
                        Discard
                    </button>
                </div>
            </div>
        </div>

    );
};

export default AddCategoryModal;
