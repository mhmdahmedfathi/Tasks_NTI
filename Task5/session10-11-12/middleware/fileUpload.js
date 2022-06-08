const multer = require("multer")
const path = require("path")
const fs = require("fs")
// const upload = multer({ dest: 'images/profile/' })
let loc="";
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(req.user)
            loc = path.join("images", req.user._id.toString()) 
        else 
            loc = "images"
        fs.mkdir(loc, (err)=>{})
        cb(null, loc)
    },
    filename: function(req,file, cb){
        const myName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, myName)
    }
})
const upload = multer({
    storage,
    limits:{fileSize:20000000},
    fileFilter: function(req, file, cb){
        if(path.extname(file.originalname)!=".png")
            return cb(new Error("invalid ext"), false)
        cb(null, true) 
    }
})

module.exports = upload