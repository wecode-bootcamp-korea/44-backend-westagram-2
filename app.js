const http = require("http");

const express = require("express")
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { DataSource } = require('typeorm');


dotenv.config() //dotenv 같은 외부 서드파티 패키지는 제일 먼저 선언해야 함 

const appDataSource = new DataSource({ //변수명 바꾸기.... 다른 rdbms도 사용할 수 있음, 보다 재사용, 유지보수를 위해 
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})


app = express() //express 기반 

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));



appDataSource.initialize()
    .then(() => { //올바른 db에 연결되었을 경우 
        console.log("Data Source has been initialized!");
    })
    .catch((err)=>{
        console.error("Error during Data Source initialization", err) //에러처리
        appDataSource.destroy();

    })
    


app.get("/ping", (req, res)=>{
    res.json({message: "pong"});
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () =>{
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`)); // 변수를 쓸 경우 백틱 주의 
}

start();