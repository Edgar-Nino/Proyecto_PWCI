const{Schema,model} = require('mongoose');

const listSchema = new Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
    pubpriv:{type:Boolean,required:true},
    imgURL:{type:String,required:true},
    username:{type:String,required:true},
    user_id:{type:String,required:true}
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('lists',listSchema)