// models/index.js
const { client } = require("../config/database_connection");

const getUserCollection = () => client.db("product-management").collection("users");
const getProduct = () => client.db("product-management").collection("products");
const getCategory = () => client.db("product-management").collection("categories");
const getWishlist = () => client.db("product-management").collection("wishlist");



module.exports = { getUserCollection, getCategory, getProduct, getWishlist };
