import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import SideBar from "../../component/Sidebar/SideBar";
import "./dashboard.css";
import { fetchProducts } from "../../services/productService";
import { useEffect, useState } from "react";
import AddCategoryModal from "../../component/modals/CategoryModal/add_category";
import AddSubcategoryModal from "../../component/modals/CategoryModal/add_subcategory";
import AddProductModal from "../../component/modals/productModal/add_product";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { addToWishlist, removeFromWishlist, getWishList } from "../../services/wishlistService";
import { Link } from "react-router-dom";
import WishlistDrawer from "../../component/Wishlist/WishlistDrawer";

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);



  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishList();
        setWishlist(response.wishlist || []);
        console.log("Wishlist fetched:", response.wishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId) => {

    try {
      if (!Array.isArray(wishlist)) return;

      const isWishlisted = wishlist.some(item => item._id === productId);
      console.log("Checking product id:", productId);
      console.log("isWishlisted:", isWishlisted);

      if (isWishlisted) {
        await removeFromWishlist(productId);
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        await addToWishlist(productId);
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
    }
  };


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
      <Navbar onWishlistClick={() => setIsDrawerOpen(true)} />
      <WishlistDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        wishlist={wishlist}
        onRemove={async (productId) => {
          try {
            await removeFromWishlist(productId);
            setWishlist((prev) => prev.filter(item => item._id !== productId));
          } catch (err) {
            console.error("Error removing from wishlist:", err);
          }
        }}
      />


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
            {products.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="image-wrapper">
                  <Link to={`/product/${product._id}`} className="image-wrapper">
                    <img src={product.images[0]} alt={product.name} />
                  </Link>
                </div>

                <div className="wishlist-wrapper" onClick={() => toggleWishlist(product._id)}>
                  {Array.isArray(wishlist) && wishlist.includes(product._id) ? (
                    <FaHeart className="wishlist-icon filled" />
                  ) : (
                    <FiHeart className="wishlist-icon" />
                  )}
                </div>

                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <div className="rating">☆ ☆ ☆ ☆ ☆</div>
              </div>
            ))}
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
