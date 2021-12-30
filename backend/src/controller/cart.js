const Cart = require("../models/cart");
const User = require("../models/user");
exports.addItemToCart = async (req, res) => {
    try {
        const existCart = await Cart.findOne({
            user: req.user._id
        });
        // let added_cart;
        if (existCart) {
            const product = req.body.cartItems.product;
            let isItemAdded = existCart.cartItems.find(cart => {
                // console.log(cart.product)
                return cart.product == product
            }
            );
            let condition, action;
            if (isItemAdded) {
                condition = {
                    "user": req.user._id, "cartItems.product": product
                };
                action = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: isItemAdded.quantity + req.body.cartItems.quantity
                        }
                    }
                };
                
            } else {
                condition = { user: req.user._id};
                action = {
                    "$push": {
                        'cartItems': req.body.cartItems
                    }
                }
              

            }
           let updated= await Cart.findOneAndUpdate( condition,action)
            res.status(200).json({updated});
        } else {

            const cart = await new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });

            const added_cart = await cart.save();
            if (added_cart) {
                res.status(201).json({
                    added_cart
                });
            }
        }
    } catch (err) {
        console.log(err)
    }
}