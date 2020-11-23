const{Schema,model} = require('mongoose');

const categorySchema = new Schema({
    name:{type:String,required:true},
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('categories',categorySchema)