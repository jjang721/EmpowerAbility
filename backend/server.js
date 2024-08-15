const express = require("express")
const { chats } = require("./data/data")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const {notFound,errorHandler} = require('./middleware/errorMiddleware')
const path = require('path');

const app = express()
dotenv.config();
connectDB()

app.use(express.json()) //this accepts the json data

app.get('/', (req,res) => {
    res.send("API is Running Successfully");

});

app.get('/api/chat', (req,res) => {
    res.send(chats)
})

// app.get('/api/chat/:id', (req,res) => {
//     // console.log(req.params.id)
//     const singleChat = chats.find(c => c._id === req.params.id)
//     res.send(singleChat)
// })

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

// --------------------------- Deplyment

const __dirname1 = path.resolve()
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname1, '/frontend/build')))

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build","index.html" ))
    })

}else{
    app.get('/', (req,res) => {
    res.send("API is Running Successfully");

});
}

// --------------------------- Deplyment

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT 

app.listen(5001,console.log(`Server started on PORT ${PORT}`));