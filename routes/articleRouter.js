const router = require("express").Router()
const Article = require("../models/articleModel")

//POST
router.post("/", async (req, res) => {
  const newArticle = new Article(req.body);
  try {
    const savedPost = await newArticle.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article.username === req.body.username) {
      try {
        const updatedPost = await Article.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article.username === req.body.username) {
      try {
        await article.delete();
        res.status(200).json("Article has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let articles;
    if (username) {
      articles = await Article.find({ username });
    }
    else {
      articles = await Article.find();
    }
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET single by id
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    res.json(article)
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});
module.exports = router;
