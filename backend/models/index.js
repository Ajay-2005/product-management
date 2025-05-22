// models/index.js
const { client } = require("../config/database_connection");

const getUserCollection = () => client.db("product-management").collection("users");
const Product = () => client.db("product-management").collection("products");
const Category = () => client.db("product-management").collection("categories");

module.exports = { getUserCollection, Product, Category };
