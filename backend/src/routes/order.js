const express = require("express");
const router =express.Router();
const {userMiddleware,authorize} = require('../common/commonAuth');
const { addOrder, getOrders } = require("../controller/order");


router.post("/user/addOrder",authorize,userMiddleware,addOrder);
router.get("/user/getOrders", authorize,userMiddleware,getOrders);
module.exports = router;