const mongoose = require("mongoose")
const {Schema} = mongoose

const bandSchema = new Schema({
    value : {type : String , required: true, unique: true},
    label: { type : String, required: true, unique: true},
})

bandSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.Brand = mongoose.model("Brand",bandSchema)