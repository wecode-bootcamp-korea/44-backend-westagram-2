const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

app.use(cors())
app.use(express.json())
//app.use(morgan("combined"))

const { DataSource } = require('typeorm')

const myDataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })

app.listen(3000, () => {
    console.log('port is listening')
})

