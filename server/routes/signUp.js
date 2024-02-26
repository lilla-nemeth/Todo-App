const { Router } = require('express');
const { isPwLongEnough, isEmail } = require('../middlewares/middlewares.js');
const { signUp } = require('../controllers/userControllers.js');

const router = Router();

router.post('/', [isEmail, isPwLongEnough], signUp);

module.exports = router;
