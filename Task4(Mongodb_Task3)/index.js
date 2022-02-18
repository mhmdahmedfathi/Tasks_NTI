const app = require('./src/app')
require('dotenv').config()
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`we are on http://localhost:${PORT}`))