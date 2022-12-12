const router = require("express").Router();
const { Project, Status } = require("../../models");
const jwt = require("jsonwebtoken")

//get associated projects by status
//(these 4 routes could be combined into one using "/:status" and a switch statement but this also works)
router.get('/:status', async (req, res) => {
    const status = req.params.status;
    switch (status) {
        case "in_progress":
            try {
                const token = req.headers.authorization.split(" ")[1];
                const userData = jwt.verify(token, process.env.JWT_SECRET);
                const projects = await Status.findAll({ where: { UserId: userData.id, in_progress: true }, include: [Project] });
                res.status(200).json(projects)
            } catch (err) {
                console.log(err)
            } break;
        case "saved_for_later":
            try {
                const token = req.headers.authorization.split(" ")[1];
                const userData = jwt.verify(token, process.env.JWT_SECRET);
                const projects = await Status.findAll({ where: { UserId: userData.id, saved_for_later: true }, include: [Project] });
                res.status(200).json(projects)
            } catch (err) {
                console.log(err)
            } break;
        case "starred":
            try {
                const token = req.headers.authorization.split(" ")[1];
                const userData = jwt.verify(token, process.env.JWT_SECRET);
                const projects = await Status.findAll({ where: { UserId: userData.id, starred: true }, include: [Project] });
                res.status(200).json(projects)
            } catch (err) {
                console.log(err)
            } break;
        case "completed":
            try {
                const token = req.headers.authorization.split(" ")[1];
                const userData = jwt.verify(token, process.env.JWT_SECRET);
                const projects = await Status.findAll({ where: { UserId: userData.id, completed: true }, include: [Project] });
                res.status(200).json(projects)
            } catch (err) {
                console.log(err)
            } break;
        case "all":
            try {
                const token = req.headers.authorization.split(" ")[1];
                const userData = jwt.verify(token, process.env.JWT_SECRET);
                const projects = await Status.findAll({ where: { UserId: userData.id }, include: [Project] });
                res.status(200).json(projects)
            } catch (err) {
                console.log(err)
            } break;
        default:
            console.log("What is ");
            break;
    }
});

//update or create new project status association
router.put('/:id', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, process.env.JWT_SECRET);
        const projects = await Status.findOne({ where: { UserId: userData.id, ProjectId: req.params.id } });
        if (projects) {
            const updatedStatus = await Status.update(
                {
                    in_progress: req.body.in_progress,
                    saved_for_later: req.body.saved_for_later,
                    starred: req.body.starred,
                    completed: req.body.completed,
                },
                {
                    where: {
                        UserId: userData.id,
                        ProjectId: req.params.id
                    },
                }
            );
            res.status(200).json(updatedStatus)
        } else {
            const newStatus = await Status.create(
                {
                    in_progress: req.body.in_progress,
                    saved_for_later: req.body.saved_for_later,
                    starred: req.body.starred,
                    completed: req.body.completed,
                    UserId: userData.id,
                    ProjectId: req.params.id,
                }
            );
            res.status(200).json(newStatus)
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;