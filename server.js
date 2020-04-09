const express = require('express');

const server = express();
const postRouter = require("./posts/postRouter")
const usersRouter = require("./users/userRouter")

server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl}`);

  next();
}

  server.use("/api/posts", postRouter)
server.use("/api/users", usersRouter)



module.exports = server;
