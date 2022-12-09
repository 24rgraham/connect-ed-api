const router = require('express').Router();
const apiRoutes = require('./api');
// const homeRoutes = require('./homeRoutes');


router.use('/api', apiRoutes);
// router.use('/', homeRoutes);

//home Route
router.get("/", (req,res)=>{
    res.send("/connect-ed")
})

module.exports = router;