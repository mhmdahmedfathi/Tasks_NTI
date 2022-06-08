const postModel = require("../../database/models/post.model")
class Post{
    static addPost= async(req,res)=>{
        try{
            //{userId:"", {title:"", content:""}}
            const post = new postModel({
                userId:req.user._id,
                ...req.body
            })
            await post.save()
            res.send({apiStatus:true, data:post, message:"added"})            
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }
    }
    static allPosts= async(req,res)=>{
        try{
            const posts = await postModel.find()
            res.send({apiStatus:true, data:posts, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }
    }
    static myPosts= async(req,res)=>{
        try{
            // const posts = await postModel.find({userId:req.user._id})
            await req.user.populate("myPosts")
            res.send({apiStatus:true, data:{user:req.user, posts:req.user.myPosts}, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }
    }
    static delPost= async(req,res)=>{
        try{
            // userLogged=1   post id = 2   - 2   post user id =5   del/2
            const posts = await postModel.deleteOne({
                _id:req.params.id,
                userId:req.user._id
            })
            // const posts = await postModel.findByIdAndDelete(req.params.id)
            if(!posts) throw new Error("invalid post")
            res.send({apiStatus:true, data:posts, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }    
    }
}
module.exports = Post