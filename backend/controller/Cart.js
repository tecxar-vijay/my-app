
const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
    const {id} = req.user; 
   try {
    const cartItems = await Cart.find({user : id}).populate("product") // it will return the whole info of product and user
    res.status(200).json(cartItems)
   } catch (error) {
    res.status(400).json(error)
   }
  };

  exports.addToCart = async (req,res) => {
    const {id} = req.user
    const item = new Cart({...req.body,user : id})
    try {
        const doc = await item.save()
        const result =await doc.populate("product")
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
  }

  exports.deleteFromCart = async (req,res) => {
    const {id} = req.params
    try {
        const doc = await Cart.findByIdAndDelete(id)
        res.status(200).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
  }

  exports.updateCart = async (req,res) => {
    const {id } = req.params
    try {
        const cart = await Cart.findByIdAndUpdate(id,req.body ,{new : true})
        const result = await cart.populate("product")
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
  }