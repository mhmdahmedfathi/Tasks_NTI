require("dotenv").config()
require("./db/dbconfig")
const express = require("express")
const app = express()
const PORT = process.env.PORT
const hbs = require("hbs")
const path = require("path")

app.use( express.static(path.join( __dirname, "./frontend/static")) )
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "./frontend/views"))
hbs.registerPartials(path.join(__dirname, "./frontend/layouts"))
app.use(express.urlencoded({extended:true}))

app.use(require("./routes/bank.routes"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get('*', (req,res)=> res.send('page not found'))
app.post('*', (req,res)=> res.send('page not found'))

app.listen(PORT, ()=> console.log(`we are on http://localhost:${PORT}`))