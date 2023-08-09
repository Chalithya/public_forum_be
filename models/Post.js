const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    heading: { type: String, required: true },
    postBody: { type: String, required: false },
    coverImage: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [
      {
        message: { type: String, required: false },
        author: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
