const mongoose = require("mongoose")
const {Schema} = mongoose

const cartSchema = new Schema({
    quantity : {type : Number , required: true},
    // here we are giving the reference of Product Schema so it will work as foreign key here
    product : {type : Schema.Types.ObjectId , ref : "Product" ,required : true },
    user : {type : Schema.Types.ObjectId , ref : "User" ,required : true }
})

cartSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.Cart = mongoose.model("Cart",cartSchema)