const express = require('expres');
const router = express.Router();
const dnMod = require('./dnModel');

router.get('/', (req, res, next) => {
    res.end()
})

module.exports = router;