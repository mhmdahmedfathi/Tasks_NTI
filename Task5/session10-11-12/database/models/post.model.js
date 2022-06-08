const mongoose = require("mongoose")
const postSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    content:{
        type:String,
        trim:true
    }
})
const post = mongoose.model("post", postSchema)
module.exports = post