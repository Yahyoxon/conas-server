const mongoose = require('mongoose')

const articleModels = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        markdown:  {
            type: String, required: false
        },
        newsImage: {
            type: Object,
            required: false,
        }, 
        username: {
            type: String,
            required: true,
          },
    },
    { timestamps: true }
);

module.exports = Article = mongoose.model("article", articleModels);