const router = require('express').Router();
const userRoutes = require('./userRoutes');
const statusRoutes = require('./statusRoutes');
const commentRoutes = require('./commentRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/status', statusRoutes);
router.use('/comments', commentRoutes);
router.use('/projects', projectRoutes);

module.exports = router;