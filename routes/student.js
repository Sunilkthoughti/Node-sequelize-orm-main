const express = require('express');
const AuthToken = require('../controllers/verifyAuth')

const StudentController = require('../controllers/student');

const router = express.Router();

router.post('/register', StudentController.create)

router.post('/login', StudentController.studentLogin)

router.get('/get',AuthToken, StudentController.studentGet)

router.patch('/update/:id',AuthToken, StudentController.studentupdate)

// router.delete('/user/:id', UserController.delete);

router.delete('/delete/:id',AuthToken, StudentController.studentdelete)



module.exports = router;