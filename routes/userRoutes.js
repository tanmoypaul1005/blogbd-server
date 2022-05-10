const app = require("express");
const router = app.Router();
const { register, LoginValidation, registerValidation, login } = require("../controllers/useController");


router.post('/register', register,);
router.post('/login', login);


module.exports = router;
