const mongoose = require("mongoose");
const mongoDB = require("./config/db");

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.helloHttp = (req, res) => {
  mongoose.connect(mongoDB.url);

  mongoose.Promise = global.Promise;

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  res.send(`Hello ${req.body.name || "World"}!`);
};
