const express = require("express");
const router = express.Router();
const { signup, signin, logout } = require("../controllers/auth_controller");
const { createCategory, listCategories } = require("../controllers/category_controller")
const { addProduct, listProducts } = require("../controllers/product_controller")
const upload = require("../middleware/upload");


router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/add-category", createCategory);
router.get("/categories", listCategories);
router.post("/add-product", upload.array('images', 3), addProduct);
router.get("/products", listProducts);





module.exports = router;
