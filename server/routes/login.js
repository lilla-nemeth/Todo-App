const { Router } = require('express');
const { isEmail } = require('../middlewares/middlewares.js');
const { login } = require('../controllers/userControllers.js');

const router = Router();

router.post('/', [isEmail], login);

module.exports = router;
