const router = require("express").Router();
const { Project, Subject, Curriculum, SubjectTag, CurriculumTag } = require("../../models");

router.put('/', async (req, res) => {
    //0 if no filters return all projects
    if (!req.body.grade_lvl && !req.body.est_time && !req.body.curriculum && !req.body.subject) {
        try {
            const data = await Project.findAll();
            res.status(200).json(data)
        } catch (err) {
            console.log(err)
        }
        //1  grade
    } else if (req.body.grade_lvl && !req.body.est_time && !req.body.curriculum && !req.body.subject) {
        try {
            const data = await Project.findAll({ where: { grade_lvl: req.body.grade_lvl } });
            res.status(200).json(data)
        } catch (err) {
            console.log(err)
        }
        //1  time
    } else if (!req.body.grade_lvl && req.body.est_time && !req.body.curriculum && !req.body.subject) {
        try {
            const data = await Project.findAll({ where: { est_time: req.body.est_time } });
            res.status(200).json(data)
        } catch (err) {
            console.log(err)
        }
        //1 cirriculum
    } else if (!req.body.grade_lvl && !req.body.est_time && req.body.curriculum && !req.body.subject) {
        try {
            const data = await Curriculum.findAll({ where: { name: req.body.curriculum }, include: { model: Project, through: CurriculumTag } });
            const refinedData = []
            data.forEach(element => {
                element.Projects.forEach(proj => refinedData.push(proj))
            });
            res.status(200).json(refinedData)
        } catch (err) {
            console.log(err)
        }
        //1 subject
    } else if (!req.body.grade_lvl && !req.body.est_time && !req.body.curriculum && req.body.subject) {
        try {
            const data = await Subject.findAll({ where: { name: req.body.subject }, include: { model: Project, through: SubjectTag } });
            const refinedData = []
            data.forEach(element => {
                element.Projects.forEach(proj => refinedData.push(proj))
            });
            res.status(200).json(refinedData)
        } catch (err) {
            console.log(err)
        }
        //2 grade and time
    } else if (req.body.grade_lvl && req.body.est_time && !req.body.curriculum && !req.body.subject) {
        try {
            const data = await Project.findAll({ where: { grade_lvl: req.body.grade_lvl, est_time: req.body.est_time } });
            res.status(200).json(data)
        } catch (err) {
            console.log(err)
        }
        //2 grade and curriculum
    } else if (req.body.grade_lvl && !req.body.est_time && req.body.curriculum && !req.body.subject) {
        try {
            const gradeData = await Project.findAll({ where: { grade_lvl: req.body.grade_lvl } });
            const curriculumData = await Curriculum.findAll({ where: { name: req.body.curriculum }, include: { model: Project, through: CurriculumTag } });
            const refinedData = []
            curriculumData.forEach(element => {
                element.Projects.forEach(proj => refinedData.push(proj))
            });
            const projects = returnMatches(gradeData, refinedData)
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
        //2 grade and subject
    } else if (req.body.grade_lvl && !req.body.est_time && !req.body.curriculum && req.body.subject) {
        try {
            const gradeData = await Project.findAll({ where: { grade_lvl: req.body.grade_lvl } });
            const subjectData = await Subject.findAll({ where: { name: req.body.subject }, include: { model: Project, through: SubjectTag } });
            const refinedData = []
            subjectData.forEach(element => {
                element.Projects.forEach(proj => refinedData.push(proj))
            });
            const projects = returnMatches(gradeData, refinedData)
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
        //2 time and curriculum
    } else if (!req.body.grade_lvl && req.body.est_time && req.body.curriculum && !req.body.subject) {
        try {
            const timeData = await Project.findAll({ where: { est_time: req.body.est_time } });
            const curriculumData = await Curriculum.findAll({ where: { name: req.body.curriculum }, include: { model: Project, through: CurriculumTag } });
            const refinedData = []
            curriculumData.forEach(element => {
                element.Projects.forEach(proj => refinedData.push(proj))
            });
            const projects = returnMatches(timeData, refinedData)
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
        //2 time and subject
    } else if (!req.body.grade_lvl && req.body.est_time && !req.body.curriculum && req.body.subject) {
        try {
            const timeData = await Project.findAll({ where: { est_time: req.body.est_time } });
            const subjectData = await Subject.findAll({ where: { name: req.body.subject }, include: { model: Project, through: SubjectTag } });
            const refinedData = []
            subjectData.forEach(element => {
                element.Projects.forEach(proj => refinedData.push(proj))
            });
            const projects = returnMatches(timeData, refinedData)
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
        //2 curriculum and subject
    } else if (!req.body.grade_lvl && !req.body.est_time && req.body.curriculum && req.body.subject) {
        try {
            const curriculumData = await Curriculum.findAll({ where: { name: req.body.curriculum }, include: { model: Project, through: CurriculumTag } });
            const refinedCurriculumData = []
            curriculumData.forEach(element => {
                element.Projects.forEach(proj => refinedCurriculumData.push(proj))
            });
            const subjectData = await Subject.findAll({ where: { name: req.body.subject }, include: { model: Project, through: SubjectTag } });
            const refinedSubjectData = []
            subjectData.forEach(element => {
                element.Projects.forEach(proj => refinedSubjectData.push(proj))
            });
            const projects = returnMatches(refinedCurriculumData, refinedSubjectData)
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
        //3 grade, time, subject
    } else if (req.body.grade_lvl && req.body.est_time && !req.body.curriculum && req.body.subject) {
        try {
            const data = await Project.findAll({ where: { grade_lvl: req.body.grade_lvl, est_time: req.body.est_time } });
            const subjectData = await Subject.findAll({ where: { name: req.body.subject }, include: { model: Project, through: SubjectTag } });
            const refinedData = []
            subjectData.forEach(element => {
                element.Projects.forEach(proj => refinedData.push(proj))
            });
            const projects = returnMatches(data, refinedData)
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
        //3 grade, time, curriculum
    } else if (req.body.grade_lvl && req.body.est_time && req.body.curriculum && !req.body.subject) {
        try {
            const data = await Project.findAll({ where: { grade_lvl: req.body.grade_lvl, est_time: req.body.est_time } });
            const curriculumData = await Curriculum.findAll({ where: { name: req.body.curriculum }, include: { model: Project, through: CurriculumTag } });
            const refinedData = []
            curriculumData.forEach(element => {
                element.Projects.forEach(proj => refinedData.push(proj))
            });
            const projects = returnMatches(data, refinedData)
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
        //3 time, curriculum, subject
    } else if (!req.body.grade_lvl && req.body.est_time && req.body.curriculum && req.body.subject) {
        try {
            const timeData = await Project.findAll({ where: { est_time: req.body.est_time } });
            const curriculumData = await Curriculum.findAll({ where: { name: req.body.curriculum }, include: { model: Project, through: CurriculumTag } });
            const refinedCurriculumData = []
            curriculumData.forEach(element => {
                element.Projects.forEach(proj => refinedCurriculumData.push(proj))
            });
            const subjectData = await Subject.findAll({ where: { name: req.body.subject }, include: { model: Project, through: SubjectTag } });
            const refinedSubjectData = []
            subjectData.forEach(element => {
                element.Projects.forEach(proj => refinedSubjectData.push(proj))
            });
            const projects = returnMatches(returnMatches(refinedCurriculumData, refinedSubjectData), timeData)
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
        //3 grade, curriculum, subject
    } else if (req.body.grade_lvl && !req.body.est_time && req.body.curriculum && req.body.subject) {
        try {
            const gradeData = await Project.findAll({ where: { grade_lvl: req.body.grade_lvl } });
            const curriculumData = await Curriculum.findAll({ where: { name: req.body.curriculum }, include: { model: Project, through: CurriculumTag } });
            const refinedCurriculumData = []
            curriculumData.forEach(element => {
                element.Projects.forEach(proj => refinedCurriculumData.push(proj))
            });
            const subjectData = await Subject.findAll({ where: { name: req.body.subject }, include: { model: Project, through: SubjectTag } });
            const refinedSubjectData = []
            subjectData.forEach(element => {
                element.Projects.forEach(proj => refinedSubjectData.push(proj))
            });
            const projects = returnMatches(returnMatches(refinedCurriculumData, refinedSubjectData), gradeData)
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
        //4 all
    } else if (req.body.grade_lvl && req.body.est_time && req.body.curriculum && req.body.subject) {
        try {
            const ogData = await Project.findAll({ where: { grade_lvl: req.body.grade_lvl, est_time: req.body.est_time } });
            const curriculumData = await Curriculum.findAll({ where: { name: req.body.curriculum }, include: { model: Project, through: CurriculumTag } });
            const refinedCurriculumData = []
            curriculumData.forEach(element => {
                element.Projects.forEach(proj => refinedCurriculumData.push(proj))
            });
            const subjectData = await Subject.findAll({ where: { name: req.body.subject }, include: { model: Project, through: SubjectTag } });
            const refinedSubjectData = []
            subjectData.forEach(element => {
                element.Projects.forEach(proj => refinedSubjectData.push(proj))
            });
            const projects = returnMatches(returnMatches(refinedCurriculumData, refinedSubjectData), ogData)
            res.status(200).json(projects)
        } catch (err) {
            console.log(err)
        }
    }
});

module.exports = router;

function returnMatches(array1, array2) {
    const newArr = []
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i].id === array2[j].id) {
                newArr.push(array1[i]);
                console.log('yes' + array1[i]);
            }
        }
    } return newArr;
}