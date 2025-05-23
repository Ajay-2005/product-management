const express = require("express");
const router = express.Router();
const { signup, signin, logout } = require("../controllers/auth_controller");
const { createCategory, listCategories } = require("../controllers/category_controller");
const { addProduct, listProducts } = require("../controllers/product_controller");
const { addToWishlist, removeFromWishlist, getWishList } = require("../controllers/wishlist_controller");
const upload = require("../middleware/upload");
const isAuthenticated = require("../middleware/isAuthenticated").default


router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/add-category", isAuthenticated, createCategory);
router.get("/categories", isAuthenticated, listCategories);
router.post("/add-product", isAuthenticated, upload.array('images', 3), addProduct);
router.get("/products", isAuthenticated, listProducts);
router.get("/get-wishlist", isAuthenticated, getWishList);
router.post('/add-wishlist', isAuthenticated, addToWishlist);
router.post('/remove-from-wishlist', isAuthenticated, removeFromWishlist);





module.exports = router;
