const bankModel = require("../db/bank")
const addAccPage = (req, res) => {
    res.render('add', {
        pageTitle: "add new Task",
    })
}

const addAccLogic = async(req, res) => {
    let accNum = new Date()
    const data = await bankModel({accNum,...req.body,Transaction:[]})
    await data.save()
    res.redirect('/')
}


const addTransactionPage = (req, res) => {
    res.render('addTransaction', {
        pageTitle: "add new Transaction",
    })
}

const addTransactionLogic = async(req, res) => {
    const data = await bankModel.findOne({_id:req.params._id})
    let balance = data.Balance ;
    if(req.body.TransactionType === "addBalance"){
        balance += parseInt(req.body.Balance)
    }else if(req.body.TransactionType === "withdraw"){
        balance -= req.body.Balance
    }
    await bankModel.findByIdAndUpdate({_id:req.params._id},{$set:{
        Transaction:[...data.Transaction,{...req.body}],
        Balance:balance
    }})
    res.redirect('/')
}



const Allaccounts =async (req, res) => {
    const allAccounts = await bankModel.find()
    res.render("all", {
        allAccounts,
        pageTitle: "HomePage",
    })
}

const showSingle = async(req, res) => {
    const Account = await bankModel.findOne({_id:req.params._id})
    res.render("single", {
        Account,
        pageTitle: "show single Account",
    })
}

const editSinglePage = async(req, res) => {
    const Account = await bankModel.findOne({_id:req.params._id})
    res.render("edit", {
        Account,
        pageTitle: "edit Account",
    })
}

const editSingleLogic =async (req, res) => {
    await bankModel.findByIdAndUpdate({_id:req.params._id},{$set:{
        ...req.body
    }})
    res.redirect('/')
}

const delAll = async(req, res) => {
    try {
        await bankModel.deleteMany()
        res.redirect('/')
    } catch (error) {
        res.send(error.message)
    }
}

const delUser = async (req, res) => {
    try {
        await bankModel.findByIdAndDelete(req.params._id)
        res.redirect('/')      
    } catch (error) {
        res.send(error.message)
    }
}


module.exports = {
    addAccPage,
    addAccLogic,
    Allaccounts,
    showSingle,
    addTransactionPage,
    addTransactionLogic,
    editSinglePage,
    editSingleLogic,
    delAll,
    delUser

}