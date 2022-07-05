const dealWithData = require("./helpers/dealWithData")

const addTaskPage = (req, res) => {
    res.render('add', {
        pageTitle: "add new Task",
    })
}

const addTaskLogic = (req, res) => {
    const allTasks = dealWithData.readDataFromJSON('./models/data.json')
    if(req.body.title === "" || req.body.content === ""){
        return res.render('add', {
            notFound: true,
            pageTitle: "Add new Task"
        })
    }
    let index = allTasks.findIndex((task) => task.title === req.body.title)
    if (index === -1) {
        allTasks.push({
            title: req.body.title,
            content: req.body.content
        })
        dealWithData.writeDataToFile('./models/data.json', allTasks)
        return res.redirect('/')
    } else {
        return res.render('add', {
            notUnique: true,
            pageTitle: "Add new Task"
        })
    }
}


const AllTasks = (req, res) => {
    const allTasks = dealWithData.readDataFromJSON('./models/data.json')
    res.render("all", {
        allTasks,
        pageTitle: "HomePage",
    })
}

const showSingle = (req, res) => {
    const allTasks = dealWithData.readDataFromJSON('./models/data.json')
    let task = allTasks.find(task => task.title === req.params.title)
    res.render("single", {
        task,
        pageTitle: "show single Task",
    })
}

const editSinglePage = (req, res) => {
    const allTasks = dealWithData.readDataFromJSON('./models/data.json')
    let task = allTasks.find(task => task.title === req.params.title)
    res.render("edit", {
        task,
        pageTitle: "edit Task",
    })
}

const editSingleLogic = (req, res) => {
    const allTasks = dealWithData.readDataFromJSON('./models/data.json')
    let index = allTasks.findIndex(task => task.title === req.params.title)
    allTasks[index].content = req.body.content
    dealWithData.writeDataToFile('./models/data.json', allTasks)
    res.redirect('/')
}

const delAll = (req, res) => {
    dealWithData.writeDataToFile('./models/data.json', [])
    res.redirect('/')
}

const delUser = (req, res) => {
    const allTasks = dealWithData.readDataFromJSON('./models/data.json')
    let index = allTasks.findIndex(task => task.title === req.params.title)
    allTasks.splice(index, 1)
    dealWithData.writeDataToFile('./models/data.json', allTasks)
    res.redirect('/')
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