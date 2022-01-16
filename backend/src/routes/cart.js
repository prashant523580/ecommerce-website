const express = require ("express");
const { authorize, userMiddleware} = require("../common/commonAuth");

const { addItemToCart, getCartItems } = require("../controller/cart");
const router = express.Router();

router.post("/cart/addtocart",authorize,userMiddleware,addItemToCart);
router.get("/getcartitems",authorize,userMiddleware,getCartItems);
module.exports = router;