console.clear()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connectDB();

app.get("/api",(req,res)=>{
    res.json({
        message:"this is get api"
    })
})
app.use('/api/user', require('./routes/userRoutes'))


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(8000, () => console.log(`Server running on port 8000`));
});
// app.listen(8000,()=>{
//     console.log("server running on 8000")
// })

