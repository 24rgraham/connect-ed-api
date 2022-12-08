const router = require("express").Router();
const { User, Project, Subject, Curriculum, SubjectTag, CurriculumTag } = require("../../models");

router.put('/', async (req, res) => {
//0 if no filters return all projects
    if (!req.body.grade_lvl && !req.body.time && !req.body.curriculum && !req.body.subject) {
        try {
            const projects = await Project.findAll();
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
//1  grade
    } else if (req.body.grade_lvl && !req.body.time && !req.body.curriculum && !req.body.subject) {
        try {
            const projects = await Project.findAll({ where: { grade_lvl: req.body.grade_lvl } });
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
//1  time
    } else if (!req.body.grade_lvl && req.body.time && !req.body.curriculum && !req.body.subject) {
        try {
            const projects = await Project.findAll({ where: { est_time: req.body.time } });
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
//1 cirriculum
    } else if (!req.body.grade_lvl && !req.body.time && req.body.curriculum && !req.body.subject) {
        try {
            const projects = await Curriculum.findAll({ where: { name: req.body.curriculum } , include: { model: Project, through: CurriculumTag }});
            const actualProjects = []
            projects.forEach(element => {
                element.Projects.forEach(proj => actualProjects.push(proj))
            });
            res.status(200).json(actualProjects)
        } catch (err) {
            console.log(err)
        }
//1 subject
} else if (!req.body.grade_lvl && !req.body.time && !req.body.curriculum && req.body.subject) {
    try {
        const projects = await Subject.findAll({ where: { name: req.body.subject } , include: { model: Project, through: SubjectTag }});
        const actualProjects = []
        projects.forEach(element => {
            element.Projects.forEach(proj => actualProjects.push(proj))
        });
        res.status(200).json(actualProjects)
    } catch (err) {
        console.log(err)
    }
//2 grade and time
    } else if (req.body.grade_lvl && req.body.time && !req.body.curriculum && !req.body.subject) {
        try {
            const projects = await Project.findAll({ where: { grade_lvl: req.body.grade_lvl, est_time: req.body.time } });
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
    }
//2 grade and subject
//2 grade and curriculum
//2 time and curriculum
//2 time and subject
//2 subject and curriculum
//3 grade, time, subject
//3 grade, time, curriculum
//3 grade, subject, curriculum
//3 time, subject, curriculum
//4 all

});

module.exports = router;