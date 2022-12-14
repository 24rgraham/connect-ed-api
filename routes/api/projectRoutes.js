const router = require("express").Router();
const jwt = require("jsonwebtoken")

const {
  User,
  Project,
  Comment,
  Curriculum,
  CurriculumTag,
  Subject,
  SubjectTag,
} = require("../../models");

// get all projects
router.get("/", (req, res) => {
  Project.findAll({
    include: [
      Comment,
      { model: Curriculum, through: CurriculumTag },
      { model: Subject, through: SubjectTag },
    ],
  })
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(500).json({ msg: "An error has occurred", err });
    });
});

router.get("/getprojectsfromtoken", async (req, res) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      const userData = jwt.verify(token, process.env.JWT_SECRET);
      const projectData = await Project.findAll({ where: { UserId: userData.id}})
      res.json(projectData);
  } catch (error) {
      res.status(500).json({ user: false });
  }
});

// get one project by id
router.get("/:id", (req, res) => {
  Project.findByPk(req.params.id, {
    include: [
      Comment,
      { model: Curriculum, through: CurriculumTag },
      { model: Subject, through: SubjectTag },
    ],
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
    const token = req.headers.authorization.split(" ")[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const newProject = await Project.create({
      title: req.body.title,
      image: req.body.image,
      grade_lvl: req.body.grade_lvl,
      est_time: req.body.est_time,
      overview_desc: req.body.overview_desc,
      directions: req.body.directions,
      materials: req.body.materials,
      resources: req.body.resources,
      UserId: userData.id,
    });
    const subjects = await newProject.addSubjects(req.body.subjects);
    const curriculums = await newProject.addCurriculums(req.body.curriculums);
    res.status(200).json(newProject);
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
});

//update project by id
router.put("/:id", async (req, res) => {
  console.log("hi");

  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const deleteSujects = await SubjectTag.destroy({
      where: {
        ProjectId: req.params.id,
      },
    });
    const deleteCurriculums = await CurriculumTag.destroy({
      where: {
        ProjectId: req.params.id,
      },
    });
    const updatedProject = await Project.update(
      {
        title: req.body.title,
        image: req.body.image,
        grade_lvl: req.body.grade_lvl,
        est_time: req.body.est_time,
        overview_desc: req.body.overview_desc,
        directions: req.body.directions,
        materials: req.body.materials,
        resources: req.body.resources,
        UserId: userData.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const actualUpdatedProject = await Project.findByPk(req.params.id);
    const subjects = await actualUpdatedProject.addSubjects(req.body.subjects);
    const curriculums = await actualUpdatedProject.addCurriculums(
      req.body.curriculums
    );
    res.status(200).json(actualUpdatedProject);
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
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
