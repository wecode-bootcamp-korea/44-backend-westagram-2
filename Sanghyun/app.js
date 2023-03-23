
require("dotenv").config()

const express = require("express") 
const cors = require("cors"); 
const morgan = require("morgan");

const { DataSource } = require('typeorm');

const appDataSource = new DataSource({ 
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})


appDataSource.initialize()
    .then(() => { 
        console.log("Data Source has been initialized!");
    })
    .catch((err)=>{
        console.error("Error during Data Source initialization", err) 
        appDataSource.destroy();

    })
    
const app = express(); 

//middleware 
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get("/ping", (req, res) => {
    res.status(200).json({message : 'pong'});
});

//create users
app.post("/users", async (req, res, next)=>{
    const {user_name, email, profile_image, user_password} = req.body

    await  appDataSource.query( 
        `INSERT INTO users(
          user_name ,
          email,
          profile_image,
          user_password     
        ) VALUES (?, ?, ?, ?);
     `,
     [user_name, email, profile_image, user_password]  
    )        

    res.status(201).json({message: "Usercreated"});
})



const PORT = process.env.PORT //

const start = () =>{
    try{
        app.listen(PORT, () => console.log(`server is listening on ${PORT}`)); 
    }catch (err) {
        console.error(err);
    }    
};

start();