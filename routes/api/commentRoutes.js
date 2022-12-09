const router = require("express").Router();
const { User, Comment, Project } = require("../../models");

// get all comments
router.get("/", (req, res) => {
    Comment.findAll()
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        res.status(500).json({ msg: "An error has occurred", err });
      });
  });
  
// get comment by id
  router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id)
      .then((comment) => {
        res.json(comment);
      })
  
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: err });
      });
  });

// create comment
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete comment by id
router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found by that id" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update comment by id
router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!commentData) {
      res.status(404).json({ message: "No comment found by that id" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
