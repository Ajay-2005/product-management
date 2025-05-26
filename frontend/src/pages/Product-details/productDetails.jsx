import React, { useState, useEffect } from 'react';
import './productDetails.css';
import Navbar from '../../component/Navbar/Navbar';
import { getProductById } from '../../services/productService';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedRam, setSelectedRam] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductById(id);
        console.log("Product data fetched:", data);
        setProduct(data.product);
        console.log("Product fetched:", data.product);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const changeQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="product-page">
        <div className="breadcrumbs">Home &gt; Product details</div>

        <div className="product-container">
          <div className="product-images">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} />
            ) : (
              <p>No image available</p>
            )}
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="price">₹{product.price}</p>
            <div className="availability">
              <span>Availability:</span>
              <span className="checkmark">✔</span>
              <span className="in-stock">In stock</span>
            </div>
            <p className="stock-warning">
              Hurry up! Only {product.quantity || 34} left in stock!
            </p>

            <hr className="divider" />

            {product.variants && product.variants.length > 0 && (
              <div className="options">
                <div className="option-group">
                  <label>RAM:</label>
                  {product.variants.map((variant) => (
                    <button
                      key={variant.ram}
                      className={`ram-btn ${selectedRam === variant.ram ? 'selected' : ''}`}
                      onClick={() => setSelectedRam(variant.ram)}
                    >
                      {variant.ram}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="option-group">
              <label>Quantity:</label>
              <div className="quantity-control">
                <button onClick={() => changeQuantity(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => changeQuantity(1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="edit-btn">Edit product</button>
              <button className="buy-btn">Buy it now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
