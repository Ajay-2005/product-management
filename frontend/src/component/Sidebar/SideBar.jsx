import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { fetchCategories } from "../../services/categoryService";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchCategories();
        if (res.success) {
          setCategories(res.categories);

          const initialOpen = {};
          res.categories.forEach((cat) => {
            if (!cat.parentCategory) {
              initialOpen[cat.name] = false;
            }
          });
          setOpenCategories(initialOpen);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  const toggleCategory = (catName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  const renderSubcategories = (parentName) => {
    return categories
      .filter((cat) => cat.parentCategory === parentName)
      .map((sub) => (
        <li key={sub._id}>
          <input type="checkbox" /> {sub.name}
        </li>
      ));
  };

  return (
    <div className="sidebar">
      <h2>Home</h2>
      <h3>Categories</h3>
      <ul>
        <li className="category">All categories</li>
        {categories
          .filter((cat) => !cat.parentCategory)
          .map((cat) => (
            <li
              key={cat._id}
              className={`category ${openCategories[cat.name] ? "active" : ""}`}
            >
              <span
                className="category-header"
                onClick={() => toggleCategory(cat.name)}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {cat.name}{" "}
                {openCategories[cat.name] ? "▼" : "▶"}
              </span>
              {openCategories[cat.name] && (
                <ul className="subcategories">
                  {renderSubcategories(cat.name)}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
