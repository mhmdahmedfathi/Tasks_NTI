const MongoClient = require("mongodb").MongoClient
const con = (cb) => {

    MongoClient.connect(process.env.dbURL, {}, (error, client)=>{
       
        if(error) return cb(error, false, false)
        const db = client.db(process.env.dbName)
        cb(false, client, db)
 
    })
}

module.exports = con