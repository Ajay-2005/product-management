const express = require("express");
const router = express.Router();
const { signup,signin,logout} = require("../controllers/auth_controller");
const {createCategory,listCategories}=require("../controllers/category_controller")

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/add-category",createCategory);
router.get("/categories", listCategories);



module.exports = router;
