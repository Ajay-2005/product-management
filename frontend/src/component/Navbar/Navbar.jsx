import React from 'react';
import './Navbar.css';
import Heart from '../../assets/heart.png';
import Cart from '../../assets/shopping-cart.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <div className="logo">MyShop</div>
                <div className="search-container">
                    <input type="text" placeholder="Search products..." />
                    <button>Search</button>
                </div>
            </div>

            <div className="nav-right">
                <div className="icon-container">
                    <img src={Heart} alt="wishlist" className="icon-image" />
                    <div className="icon-badge">2</div>
                </div>
                <Link to="/signin" style={{ textDecoration: 'none',color:'white' }}>
                    <span>Sign In</span>
                </Link>
                <div className="icon-container">
                    <img src={Cart} alt="cart" className="icon-image" />
                    <div className="icon-badge">3</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;