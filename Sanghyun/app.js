require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { DataSource } = require("typeorm");
<<<<<<< HEAD
const { json } = require("body-parser");
=======
>>>>>>> feature/assignment-3

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

<<<<<<< HEAD

async function findMatched (userId, password, postId){
  const user = await appDataSource.query(
    `SELECT * FROM users WHERE id = ? AND user_password = ?`,
    [userId, password]
  );

  if (user.length === 0) {
    return res.status(404).json({ message: "user not found" });
  }

  const post = await appDataSource.query(
    `SELECT * FROM posts WHERE id = ?`,
    [postId]
  );
  console.log(post)   
  if(post.length ===0){
    return res.status(404).json({ message: "post not found" });
  }
}

app.post("/users", async (req, res, next) => {
  const { userName, email, profileImage, userPassword } = req.body;

  if(!userName || !email || !profileImage|| !userPassword){
    return res.status(400).json({message: "key error"})
  }

  await appDataSource.query(
    `INSERT INTO users(
      user_name ,
      email,
      profile_image,
      user_password     
    ) VALUES (?, ?, ?, ?);
=======
app.post("/users", async (req, res, next) => {
  const { userName, email, profileImage, userPassword } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
          user_name ,
          email,
          profile_image,
          user_password     
        ) VALUES (?, ?, ?, ?);
>>>>>>> feature/assignment-3
     `,
    [userName, email, profileImage, userPassword]
  );

<<<<<<< HEAD
  res.status(201).json({ message: "usercreated" });
=======
  res.status(201).json({ message: "Usercreated" });
>>>>>>> feature/assignment-3
});

app.post("/posts", async (req, res, next) => {
  const { title, content, userId, postingImageUrl } = req.body;

<<<<<<< HEAD
  if(!title || !content || !userId|| !postingImageUrl){
    return res.status(400).json({message: "key error"})
  }

  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      user_id,
      posting_image_url
    ) VALUES (?, ?, ?, ?);
=======
  await appDataSource.query(
    `INSERT INTO posts(
       title,
       content,
       user_id,
       posting_image_url
        ) VALUES (?, ?, ?, ?);
>>>>>>> feature/assignment-3
     `,
    [title, content, userId, postingImageUrl]
  );

<<<<<<< HEAD
  res.status(201).json({ message: "postCreated" });
=======
  res.status(201).json({ message: "Postcreated" });
>>>>>>> feature/assignment-3
});


app.get("/lists", async (req, res, next) => {
 
  let lists;
 
<<<<<<< HEAD
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
=======
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
>>>>>>> feature/assignment-3

  res.status(200).json({ data: lists });
});

<<<<<<< HEAD
app.get("/postings/:userId", async (req, res) => {
    const { userId } = req.params;
    
    if(!userId){
      return res.status(400).json({message: "key error"})
    }
    
    const user = await appDataSource.query(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );
    
      if (user.length === 0) {
        return res.status(404).json({ message: "user not found" });
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

  app.put("/patch", async (req, res) =>{
    const {userId, password, postId, title, content, postingImageUrl} = req.body;

    if(!userId || !password || !postId|| !title || !content || !postingImageUrl){
        return res.status(400).json({message: "key error"})
    }
    
    findMatched(userId, password, postId)

    await appDataSource.query(
      `
      UPDATE posts 
      SET 
        title = ?,
        content = ?,
        posting_image_url = ?
      WHERE posts.id =? 
      
      `,
       [title, content, postingImageUrl, postId] 

    );
    
    const patchedData = await appDataSource.query(
      `SELECT  
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "userId", u.id,
              "userName", p.posting_image_url,
              "postingId" , p.id,
              "postingTitle", p.title,
              "postingContent", p.content
            )
          ) AS patchedData    
        FROM 
          users AS u            
          JOIN posts AS p
           ON  p.user_id = u.id         
        WHERE p.id =? 
        `,
      [postId]
    );
    
    res.status(200).json({ message: "patched done", data: (patchedData) });
  });


  app.delete("/delete", async (req, res) => {
    const {userId, password, postId} = req.body;

    if(!userId || !password || !postId){
        return res.status(400).json({message: "key error"})
    }
  
    const user = await appDataSource.query(
      `SELECT * FROM users WHERE id = ? AND user_password = ?`,
      [userId, password]
    );
  
    if (user.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    const post = await appDataSource.query(
      `SELECT * FROM posts WHERE id = ?`,
      [postId]
    );
  
    if(post.length ===0){
      return res.status(404).json({ message: "post not found" });
    }


  await appDataSource.query(
    `
      DELETE

      FROM posts AS p

      WHERE p.id = ? 
    `,
    [postId]
  )

  return res.status(201).json({ message: "postingDeleted"}); 
  });



  app.post("/likes", async (req, res) => {
    const {userId, password, postId} = req.body;

    const user = await appDataSource.query(
      `SELECT * FROM users WHERE id = ? AND user_password = ?`,
      [userId, password]
    );
  
    if (user.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    const post = await appDataSource.query(
      `SELECT * FROM posts WHERE id = ?`,
      [postId]
    );
  
    if(post.length ===0){
      return res.status(404).json({ message: "post not found" });
    }

    
    if (post.length === 0) {
        return res.status(404).json({ message: "post not found" });
    }
  
    const likes = await appDataSource.query(
        `SELECT * FROM likes WHERE user_id =? AND post_id =?`,
        [userId, postId]
    )
 
    if(likes.length ===0 ){ 
        await appDataSource.query( 
            `INSERT INTO likes( 
                user_id,
                post_id
                 ) VALUES (?, ?);
              `,
              [userId, postId]
        )

        return res.status(201).json({message: "likesCreated"})

    } else { 
         await appDataSource.query( 
            `
              DELETE
      
              FROM likes 
      
              WHERE user_id = ? AND post_id = ?
            `,
            [userId, postId]
          )
          return res.status(201).json({message: "likesDeleted"})    
    };
  });
=======


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



>>>>>>> feature/assignment-3

const PORT = process.env.PORT;

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
