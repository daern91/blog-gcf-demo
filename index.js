const mongoose = require("mongoose");

const Post = require("./models/post");
const Author = require("./models/author");

let mongoDB;
try {
  mongoDB = require("./config/db").url;
} catch (error) {
  mongoDB = process.env.MONGODB;
}

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.helloHttp = (req, res) => {
  res.send(`Hello ${req.body.name || "World"}!`);
};

function _createAuthor(first_name, family_name, date_of_birth) {
  return Author.create({ first_name, family_name, date_of_birth }).then(
    author => {
      console.log(author);
      console.log("saved!");
    }
  );
}

exports.createAuthor = (req, res) => {
  mongoose.connect(mongoDB);
  mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );

  const { first_name, family_name, date_of_birth } = req.body;
  return _createAuthor(first_name, family_name, date_of_birth).then(() => {
    res.send(`Author ${first_name} ${family_name} successfully created!`);
  });
};

function _createPost(title, author, content, visible) {
  return Post.create({ title, author, content, visible }).then(post => {
    console.log(post);
    console.log("saved!");
  });
}

exports.createPost = (req, res) => {
  mongoose.connect(mongoDB);
  mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );

  const { title, author, content, visible } = req.body;
  return _createPost(title, author, content, visible).then(() => {
    res.send(`Post ${title} successfully created!`);
  });
};
