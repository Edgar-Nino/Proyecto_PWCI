const{Schema,model} = require('mongoose');

const productSchema = new Schema({
    id_list:{type:String,required:true},
    name:{type:String,required:true},
    desc:{type:String,required:true},
    seTiene:{type:Boolean,required:true},
    user_id:{type:String,required:true},
    imgURL:{type:String,required:true},
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('products',productSchema)