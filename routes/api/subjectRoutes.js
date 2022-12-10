const router = require("express").Router();
const { Subject } = require("../../models");

// create subject
router.post("/", async (req, res) => {
  try {
    const subjectData = await Subject.create({
      name: req.body.name,
    });
    res.status(200).json(subjectData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete subject
router.delete("/:id", async (req, res) => {
  try {
    const subjectData = await Subject.destroy({
      where: { id: req.params.id },
    });
    if (!subjectData) {
      res.status(404).json({ message: "No subject found by that id" });
      return;
    }
    res.status(200).json(subjectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;