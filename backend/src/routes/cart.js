const express = require ("express");
const { authorize, userMiddleware} = require("../common/commonAuth");

const { addItemToCart } = require("../controller/cart");
const router = express.Router();

router.post("/cart/addtocart",authorize,userMiddleware,addItemToCart);

module.exports = router;