import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import SideBar from "../../component/Sidebar/SideBar";
import "./dashboard.css";
import { fetchProducts } from "../../services/productService";
import { useEffect, useState } from "react";
import AddCategoryModal from "../../component/modals/CategoryModal/add_category";
import AddSubcategoryModal from "../../component/modals/CategoryModal/add_subcategory";
import AddProductModal from "../../component/modals/productModal/add_product";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        ;
        const response = await fetchProducts();
        console.log(response)
        setProducts(response.products);
        console.log(products);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-container">
        <SideBar />

        <div className="dashboard-main">
          <div className="top-bar">
            <button onClick={() => setIsCategoryModalOpen(true)}>Add category</button>

            <button onClick={() => setIsSubcategoryModalOpen(true)}>Add subcategory</button>
            <button onClick={() => setIsAddProductModalOpen(true)}>Add product</button>
          </div>
          <AddCategoryModal
            isOpen={isCategoryModalOpen}
            onClose={() => setIsCategoryModalOpen(false)}
            onAdd={(category) => {
              console.log("Category added:", category);
              setIsCategoryModalOpen(false);
            }}
          />
          <AddSubcategoryModal
            isOpen={isSubcategoryModalOpen}
            onClose={() => setIsSubcategoryModalOpen(false)}
            onAdd={(subcategory) => {
              console.log("Subcategory added:", subcategory);
              setIsSubcategoryModalOpen(false);
            }}
          />
          <AddProductModal
            isOpen={isAddProductModalOpen}
            onClose={() => setIsAddProductModalOpen(false)}
            onAdd={(product) => {
              console.log("Product added:", product);
              setIsAddProductModalOpen(false);
            }}
          />
          <div className="product-grid">
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((product, index) => (
                <div className="product-card" key={index}>
                  <img src={product.images[0]} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>{product.price}</p>
                  <div className="rating">☆ ☆ ☆ ☆ ☆</div>
                </div>
              ))
            )}

          </div>

          <div className="footer-bar">
            <p>10 of 456 items</p>
            <div className="pagination">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} className={n === 1 ? "active" : ""}>
                  {n}
                </button>
              ))}
              <span>…</span>
              <button>10</button>
            </div>
            <div className="row-selector">
              Show <select><option>10 rows</option></select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
