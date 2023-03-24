require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
    appDataSource.destroy();
  });

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.post("/users", async (req, res, next) => {
  const { userName, email, profileImage, userPassword } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
          user_name ,
          email,
          profile_image,
          user_password     
        ) VALUES (?, ?, ?, ?);
     `,
    [userName, email, profileImage, userPassword]
  );

  res.status(201).json({ message: "Usercreated" });
});

app.post("/posts", async (req, res, next) => {
  const { title, content, userId, postingImageUrl } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
       title,
       content,
       user_id,
       posting_image_url
        ) VALUES (?, ?, ?, ?);
     `,
    [title, content, userId, postingImageUrl]
  );

  res.status(201).json({ message: "Postcreated" });
});


app.get("/lists", async (req, res, next) => {
 
  let lists;
 
    lists = await appDataSource.query(
      `SELECT  
        u.id AS userId,
        u.profile_image AS userProfileImage,
        p.id AS postingId,
        p.posting_image_url AS postingImageUrl,
        p.content AS postingContent  

        FROM users AS u
        JOIN posts AS p
        ON p.user_id = u.id
        `,
    );

  res.status(200).json({ data: lists });
});



app.get("/postings/:userId", async (req, res) => {
    const { userId } = req.params;
    
        const user = await appDataSource.query(
            "SELECT * FROM users WHERE id = ?",
            [userId]
          );
        
          if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
          }
    
      
        const postings = await appDataSource.query(
          `SELECT 
            u.id AS userId,
            u.profile_image AS userProfileImage,
            JSON_ARRAYAGG(
              JSON_OBJECT(
                "postingId", p.id,
	              "postingImageUrl", p.posting_image_url,
		            "postingContent" , p.content
                )
            ) AS postings
          FROM 
            users AS u            
            JOIN posts AS p
            ON  p.user_id = u.id 
          WHERE 
            u.id = ?
          GROUP BY 
            u.id
          `,
          [userId]
        );
  
    res.status(200).json({ data : postings });
  });




const PORT = process.env.PORT;

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
