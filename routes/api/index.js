const router = require('express').Router();
const userRoutes = require('./userRoutes');
const statusRoutes = require('./statusRoutes');
// const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/status', statusRoutes)
// router.use('/comments', commentRoutes);

module.exports = router;