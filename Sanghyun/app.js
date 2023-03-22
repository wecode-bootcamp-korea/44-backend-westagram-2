// const http = require("http");

require("dotenv").config()

const express = require("express") // require 메소드를 통해서 express 모듈을 임포트하여 객체를 생성하고 express 변수가 참조하도록 하는 행위 
const cors = require("cors"); 
const morgan = require("morgan");

const { DataSource } = require('typeorm');

const appDataSource = new DataSource({ //변수명 바꾸기.... 다른 rdbms도 사용할 수 있음, 보다 재사용, 유지보수를 위해 
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})


appDataSource.initialize()
    .then(() => { //올바른 db에 연결되었을 경우 
        console.log("Data Source has been initialized!");
    })
    .catch((err)=>{
        console.error("Error during Data Source initialization", err) //에러처리
        appDataSource.destroy();

    })
    
app = express() //express() 함수를 호출하고, app이라는 변수안에 담는 행위 

//middleware 
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get("/ping", (req, res) => {
    res.status(200).json({message : 'pong'});
});

const PORT = process.env.PORT

const start = () =>{
    try{
        app.listen(PORT, () => console.log(`server is listening on ${PORT}`)); 
    }catch (err) {
        console.error(err);
    }    
};

start();