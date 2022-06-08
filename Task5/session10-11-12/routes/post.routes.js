const router = require('express').Router()
const auth = require('../middleware/auth')
//user login => add post , show all posts, show his own posts, delete own post 
//post => title, content, userId
const postController = require("../app/controller/post.controller")
router.post("/add", auth, postController.addPost)
router.get("/allPosts", auth, postController.allPosts)
router.get("/myPosts", auth, postController.myPosts)
router.delete("/delPost/:id", auth, postController.delPost)
module.exports= router