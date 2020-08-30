const router = require('express').Router();
//const htmlRoutes = require('./html/html-routes');
const apiRoutes = require('./api');
const htmlRoutes = require("./html/html-routes");

router.use('/api', apiRoutes);
router.use("/", htmlRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> 🤯 404 Error!');
})

module.exports = router;