const router = require("express").Router();
const { User, Project, Curriculum, CurriculumTag } = require("../../models");

// create curriculum
router.post("/", async (req, res) => {
  try {
    const curriculumData = await Curriculum.create({
      name: req.body.name,
    });
    res.status(200).json(curriculumData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete curriculum
router.delete("/:id", async (req, res) => {
  try {
    const curriculumData = await Curriculum.destroy({
      where: { id: req.params.id },
    });
    if (!curriculumData) {
      res.status(404).json({ message: "No curriculum found by that id" });
      return;
    }
    res.status(200).json(curriculumData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
