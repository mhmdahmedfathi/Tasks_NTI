const dealWithData = require("./helpers/dealWithData")
const dbcon = require("../models/dbCon")


const addTaskPage = (req, res) => {
    res.render('add', {
        pageTitle: "add new Task",
    })
}

const addTaskLogic = (req, res) => {
    dbcon((e,client,db)=>{
        if(e) return res.send(e.message)
        db.collection("Tasks").find().toArray((err,result)=>{
            let index = result.findIndex((task) => task.title === req.body.title)
            if (index === -1) {
                db.collection("Tasks").insertOne({
                    title: req.body.title,
                    content: req.body.content
                },(error,result)=>{
                    if(error) res.send(error)
                    client.close()
                    res.redirect('/')
                })
            } else {
                res.render('add', {
                    notUnique: true,
                    pageTitle: "Add new Task"
                })
            }
        })
    })
}


const AllTasks = (req, res) => {
    dbcon((e,client,db)=>{
        if(e) return res.send(e.message)
        db.collection("Tasks").find().toArray((err,result)=>{
            if(err) res.send(err.message)
            client.close()
            res.render("all", {
            allTasks: result,
            pageTitle: "HomePage",
            })
        })
    })
}

const showSingle = (req, res) => {
    dbcon((e,client,db)=>{
        db.collection("Tasks").findOne({title:req.params.title},(err,result)=>{
            if(err) res.send(err.message)
            client.close()
            res.render("single", {
                task:result,
                pageTitle: "show single Task",
            })
        })
    })
}

const editSinglePage = (req, res) => {
    dbcon((e,client,db)=>{
        db.collection("Tasks").findOne({title:req.params.title},(err,result)=>{
            if(err) res.send(err.message)
            client.close()
            res.render("edit", {
                task:result,
                pageTitle: "edit Task",
            })
        })
    })
}

const editSingleLogic = (req, res) => {
    dbcon((e,client,db)=>{
        db.collection("Tasks").updateOne({title:req.params.title},{
                $set: {...req.body}
        })
        res.redirect('/')
    })
}

const delAll = (req, res) => {
    dbcon((e, client, db)=>{
        if(e) return res.send(e.message)
        db.collection('Tasks').deleteMany().then(()=>{
            client.close()    
            res.redirect("/")
        })
    })
}

const delUser = (req, res) => {
    dbcon((e, client, db)=>{
        if(e) return res.send(e.message)
        db.collection('Tasks').deleteOne({title:req.params.title}).then(()=>{
            client.close()    
            res.redirect("/")
        })
    })
}


module.exports = {
    addTaskPage,
    addTaskLogic,
    AllTasks,
    showSingle,
    editSinglePage,
    editSingleLogic,
    delAll,
    delUser

}