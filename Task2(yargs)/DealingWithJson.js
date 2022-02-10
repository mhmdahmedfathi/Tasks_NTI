const fs = require("fs")

const writeDataToFile = (fileName, data) =>{
    try{
        if(!Array.isArray(data)) 
            throw new Error("invalid data type")
        fs.writeFileSync(fileName, JSON.stringify(data))
        console.log("data added")
    }
    catch(err){
        console.log(err.message)
    }
}
const readDataFromJSON = (fileName) =>{
    let data
    try{
        data = JSON.parse(fs.readFileSync(fileName))
    }
    catch(e){
        console.log("data reset")
        data = []
    }
    return data
}
module.exports = {
    writeDataToFile,
    readDataFromJSON
}