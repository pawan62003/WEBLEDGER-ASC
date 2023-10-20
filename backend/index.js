const express = require('express')
const {connection} = require("./db")
const { UserRoute } = require('./routes/User.Route')

const server = express()
server.use(express.json())

server.use('/user',UserRoute)



server.listen(8080, async()=>{
    try {
        await connection
        console.log("connected to database")
        console.log("server is running on port 8080")
    } catch (error) {
        console.log(error)
    }
})