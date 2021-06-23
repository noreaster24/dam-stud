const router =require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes.js');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('./api', apiRoutes);
router.use('/', htmlRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;