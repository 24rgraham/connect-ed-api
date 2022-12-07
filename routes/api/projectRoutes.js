const router = require("express").Router();
const { User, Project, Comment } = require("../../models");

// get all projects
router.get("/", (req, res) => {
  Project.findAll({
    include: [Comment],
  })
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(500).json({ msg: "An error has occurred", err });
    });
});

// get one project by id
router.get("/:id", (req, res) => {
  Project.findByPk(req.params.id, {
    include: [Comment]
  })
    .then((project) => {
      res.json(project);
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

// create project
router.post("/", async (req, res) => {
  try {
    const newProject = await Project.create({
      title: req.body.title,
      image: req.body.image,
      grade_lvl: req.body.grade_lvl,
      est_time: req.body.est_time,
      curriculum: req.body.curriculum,
      subject: req.body.subject,
      overview_desc: req.body.overview_desc,
      directions: req.body.directions,
      materials: req.body.materials,
      resources: req.body.resources,
      UserId: req.session.UserId,
    });
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update project by id
router.put("/:id", (req, res) => {
  Project.update(
    {
      title: req.body.title,
      image: req.body.image,
      grade_lvl: req.body.grade_lvl,
      est_time: req.body.est_time,
      curriculum: req.body.curriculum,
      subject: req.body.subject,
      overview_desc: req.body.overview_desc,
      directions: req.body.directions,
      materials: req.body.materials,
      resources: req.body.resources,
      UserId: req.session.UserId,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedProject) => {
      if (updatedProject[0] === 0) {
        return res.status(404).json({ msg: "No project found by that id" });
      }
      res.json(updatedProject);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

// delete project by id
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!project) {
      return res.status(400).json({ message: "No project found by that id" });
    }
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
