const{Schema,model} = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    username:{type:String,required:true, unique: true, uniqueCaseInsensitive: true},
    email:{type:String,required:true, unique: true, uniqueCaseInsensitive: true},
    password:{type:String,required:true},
    imgURL:{type:String,required:true},
    type:{type:String,required:true,default:1},
},{
    timestamps: true,
    versionKey: false
})

userSchema.methods.encryptPassword = async(password)=>
{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt)
}

userSchema.methods.validatePassword = async function(password)
{
    console.log(password)
    console.log(this.password)
    return await bcrypt.compare(password, this.password);
}



userSchema.plugin(uniqueValidator,{message:'Se esperaba un {PATH} unico'});
module.exports = model('users', userSchema)