const mongoose = require("mongoose")
const bank = new mongoose.model("Bank", { 
    accNum:{
        type:Number,
        unique:true,
        required:true
    },
    Name:{
        type:String,
        required:true
    }, 
    Balance:{
        type:Number,
        min:0,
        required:true
    },
    Transaction:[{
        TransactionType:{
            type:String,
            enum:["withdraw","addBalance"],
            required:true
        },
        Balance:{
            type:Number,
            required:true
        }
    }]
})

module.exports = bank