const Order = require("../models/order");
const Cart = require("../models/cart");
const Address = require("../models/address");
exports.addOrder =  async(req,res) => {
    try{
        console.log(req.body)
        const cart = await Cart.deleteOne({user:req.user._id});
        if(cart){
            req.body.user = req.user._id;
            req.body.orderStatus = [
                {
                    type: "ordered",
                    isCompleted : true
                },
                {
                    type: "packed",
                    isCompleted: false
                },
                {
                    type: "shipped",
                    isCompleted:false
                },
                {
                    type:"delivered",
                    isCompleted: false
                }
            ]
            const order = await Order(req.body);
            let added_order = await order.save();
            if(added_order){
                res.status(201).json({order: added_order});
            }
            
        }
    }catch(error){
        res.status(400).json(error)
    }
    }
    
    exports.getOrders = async (req,res) => {
        try{
        const order = await Order.find({user:req.user._id})
        .select("_id paymentStatus paymentType items orderStatus")
        .populate("items.productId", "_id name productPicture").exec();
        if(order){
            res.status(200).json({order})
        }
    }catch(err){
        res.status(200).json({error:err})

    }
}