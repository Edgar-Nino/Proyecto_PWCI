const{Schema,model} = require('mongoose');

const productSchema = new Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
    category:{type:String,required:true},
    idCategory:{type:String,required:true},
    imgURL:{type:String,required:true},
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('products',productSchema)