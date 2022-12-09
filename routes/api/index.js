const router = require('express').Router();
const userRoutes = require('./userRoutes');
const statusRoutes = require('./statusRoutes');
const commentRoutes = require('./commentRoutes');
const projectRoutes = require('./projectRoutes');
const ultimateSearch = require('./ultimateSearch');
const subjectRoutes = require('./subjectRoutes');
const curriculumRoutes = require('./curriculumRoutes');



router.use('/users', userRoutes);
router.use('/status', statusRoutes);
router.use('/comments', commentRoutes);
router.use('/projects', projectRoutes);
router.use('/search', ultimateSearch);
router.use('/subjects', subjectRoutes);
router.use('/curriculums', curriculumRoutes);

module.exports = router;