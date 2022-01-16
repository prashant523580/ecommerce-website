const Cart = require("../models/cart");
exports.addItemToCart = async (req, res) => {
    try {
        const existCart = await Cart.findOne({
            user: req.user._id
        });
        console.log(existCart, "is ")
        if (existCart) {
            const product = req.body.cartItems.product;
            console.log(product)
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
            res.status(201).json({ cartItems: updated});
        } else {
            const cart = await new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
            const added_cart = await cart.save();
            console.log(added_cart, 'sad')
            if (added_cart) {
                res.status(201).json({
                   cartItems : added_cart
                });
            }
        }
    } catch (error) {
    res.status(422).json({error})
    }
}

exports.getCartItems = (req, res) => {
    Cart.findOne({ user: req.user._id })
      .populate("cartItems.product", "_id name price productPicture")
      .exec((error, cart) => {
          console.log(cart)
        if (error) return res.status(400).json({ error });
        if (cart) {
          let cartItems = {};
          cart.cartItems.forEach((item, index) => {
            cartItems[item.product._id.toString()] = {
              _id: item.product._id.toString(),
              name: item.product.name,
              img: item.product.productPicture[0].img,
              price: item.product.price,
              qty: item.quantity,
            };
          });
          console.log(cartItems)
          res.status(200).json({ cartItems });
        }
      });
   
  };