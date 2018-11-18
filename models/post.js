const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  content: { type: String, required: true },
  visible: Boolean
});

// Virtual for post's URL
PostSchema.virtual("url").get(function() {
  return "/catalog/post/" + this._id;
});

//Export model
module.exports = mongoose.model("Post", PostSchema);
