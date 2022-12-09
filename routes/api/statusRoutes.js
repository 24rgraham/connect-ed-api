const router = require("express").Router();
const { Project, Status } = require("../../models");

//get associated projects by status
//(these 4 routes could be combined into one using "/:status" and a switch statement but this also works)
router.get('/in_progress', async (req, res) => {
    try {
        const projects = await Status.findAll({ where: { UserId: req.session.userId, in_progress: true }, include: [Project] });
        res.status(200).json(projects)
    } catch (err) {
        console.log(err)
    }
});

router.get('/saved_for_later', async (req, res) => {
    try {
        const projects = await Status.findAll({ where: { UserId: req.session.userId, saved_for_later: true }, include: [Project] });
        res.status(200).json(projects)
    } catch (err) {
        console.log(err)
    }
});

router.get('/starred', async (req, res) => {
    try {
        const projects = await Status.findAll({ where: { UserId: req.session.userId, starred: true }, include: [Project] });
        res.status(200).json(projects)
    } catch (err) {
        console.log(err)
    }
});

router.get('/completed', async (req, res) => {
    try {
        const projects = await Status.findAll({ where: { UserId: req.session.userId, completed: true }, include: [Project] });
        res.status(200).json(projects)
    } catch (err) {
        console.log(err)
    }
});

//create new project status association

//update project status association

//delete project status association

module.exports = router;