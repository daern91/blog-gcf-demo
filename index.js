const mongoose = require("mongoose");

const Post = require("./models/post");
const Author = require("./models/author");
const mongoDB = require("./config/db").url;

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

function createAuthor(first_name, family_name, date_of_birth) {
  Author.create({ first_name, family_name, date_of_birth }).then(author => {
    console.log(author);
    console.log("saved!");
  });
}

exports.createAuthor = (req, res) => {
  mongoose.connect(mongoDB);
  mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );

  const { first_name, family_name, date_of_birth } = req.body;
  createAuthor(first_name, family_name, date_of_birth);

  res.send(`Author ${first_name} ${family_name} successfully created!`);
};
