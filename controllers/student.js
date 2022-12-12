const { User, Student } = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const validate = require('express-validator');
const { Model } = require('sequelize');



const handleError = (err, res) => {
    console.error(err);

    res.status(500).json({
        message: err.message
    })
};

const controller = {};

controller.create = async (req, res) => {
    try {

        const emailExist = await Student.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(203).json({ responseCode: { response: res.statusCode, "status": "wrong", "message": "email has already exist" } })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const { name, surname, username, email, password } = req.body;


        const result = new Student({
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: hashedPassword,

        })
        const result1 = await result.save();
        if (result1) {
            return res.send(result1)
        }

    }
    catch (e) {
        console.log(e)
    }
}

controller.studentLogin = async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.body.email })
        if (!student) {
            return res.status(400).send("email not found")
        }

        const validPass = await bcrypt.compare(req.body.password, student.password)
        if (!validPass) {
            return res.send("invalid pass")
        }
        else {
            const token = jwt.sign({ _id: student._id }, process.env.TOKEN_SECRET)
            res.header("auth-token", token).send({ message: "login success", token: token })
        }

    }
    catch (e) {
        console.log(e)

    }
}



controller.studentGet = async (req, res) => {
    try {
        const student = await Student.findAll();
        if (student.length == 0) {
            res.send("no result found")
        }
        else {
            res.send(student)
        }

    }
    catch (e) {
        console.log(e)
    }
}


controller.studentupdate = async (req, res) => {
    try {
        const data = req.body;
        // const { id } = req.params;

        await Student.update(data, { where: { id: req.params.id }, Student });

        return res.status(200).json({
            message: 'Student Updated!',
        })
    } catch (err) {
        handleError(err, res);
    }
}



//  controller.delete = async (req, res) => {
//     try {
//         // const { id } = req.params.id;

//         const result = await Student.destroy({
//             where: { id : req.params.id},Student
//         });

//         if (!result) {
//             return res.status(404).json({
//                 message: 'Student Not Found!',
//             })
//         }

//         return res.status(200).json({
//             message: 'Student Deleted!',
//         })
//     } catch (err) {
//         handleError(err, res);
//     }
// };

// controller.studentdelete1 = async(req,res) => {
//     try{
//         const studentdelete = await St
//         res.send(studentdelete);
//     }
//     catch(e){
//         console.log(e)
//     }
// }
// controller.studentDelete = async(req,res)=>{
//     try {
//         const studentDelete1 =  await Student.DELETE({id:req.params.id})
        
//     } catch (error) {
        
//     }
// }

controller.studentdelete = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Student.destroy({
            where: { id }
        });

        if (!result) {
            return res.status(404).json({
                message: 'Student Not Found!',
            })
        }

        return res.status(200).json({
            message: 'Student Deleted!',
        })
    } catch (err) {
        handleError(err, res);
    }
};


    module.exports = controller;
