const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt =  require("jsonwebtoken")
const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(val){
            if(!validator.isEmail(val)) throw new Error("invalid email format")
        }
    },
    password:{
        type:String,
        // match:'/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/'
    },
    birthDate:{
        type:Date,
        required:true
    },
    image:{
        type:String
    },
    otp:{
        type:String
    },
    tokens:[
        {    
            token:{
                type:String,
                required:true,
                trim:true
            }
        }
    ]
},
{timestamps:true}
)
userSchema.virtual("myPosts", {
    ref:"post",
    localField:"_id",
    foreignField:"userId"
})
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    // delete user.password
    const deletes = ['__v', 'password', 'tokens']
    deletes.forEach(d=> delete user[d])
    return user
}
userSchema.pre("save", async function(){
    if(this.isModified("password")) 
        this.password = await bcrypt.hash(this.password, parseInt(process.env.salt))
})
userSchema.statics.login = async(email, password)=>{
    const userData = await user.findOne({email})
    if(!userData) throw new Error('invalid email')
    const isValid = await bcrypt.compare(password, userData.password)
    if(!isValid) throw new Error("invalid password")
    return userData
}
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWTKEY )
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
const user = mongoose.model("user", userSchema)
module.exports = user