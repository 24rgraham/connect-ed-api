const router = require("express").Router();
const { User, Project, Subject, Curriculum, SubjectTag, CurriculumTag } = require("../../models");

router.get('/', async (req, res) => {
    try {
        const projects = await Status.findAll({ where: { UserId: req.session.userId, in_progress: true }, include: [Project] });
        res.status(200).json(projects)
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;