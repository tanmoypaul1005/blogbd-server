const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// module.exports.registerValidation = [
//     body("name").not().isEmpty().trim().withMessage("Name is require"),
//     body("email").not().isEmpty().trim().withMessage("Email is require"),
//     // body("password").isLength({ min: 6 }).withMessage("Password is require")
// ]
module.exports.register = (req, res) => {
    const { name, email, password } = req.body;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user) {
                // return res.status(400).json({ massage: "User AllReady register" });
                User.findOne({ email: req.body.email })
                    .exec((error, user) => {
                        if (error) return res.status(401).json({ message: error });

                        const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
                        if (user) {

                            const { _id, name, email } = user;
                            res.status(201).json({
                                message: 'You have login successfully',
                                token,
                                user: { _id, name, email }
                            })

                        } else { return res.status(402).json({ message: 'Somethings went wrong' }); }
                    });
            }

            const hash_password = ''
            password ? hash_password = await bcrypt.hash(password, 10) : '';

            const _user = new User({ name, email, hash_password });
            const token = jwt.sign({ name: name, email: email }, process.env.JWT_SECRET, { expiresIn: '7d' })
            _user.save((error, data) => {
                // if (error) {
                //     return res.status(401).json({ error });
                // }
                if (data) {
                    return res.status(201).json({
                        massage: "User Created successfully",
                        data, token
                    })
                }
            })

        });
}

module.exports.LoginValidation = [
    body("email").not().isEmpty().trim().withMessage("Email is require"),
    body("password").not().isEmpty().withMessage("Password is require")
]


module.exports.login = (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) { return res.status(400).json(error); }

    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(401).json({ message: error });

            const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
            if (user) {
                const matched = bcrypt.compare(req.body.password, user.password);
                if (matched) {
                    const { _id, name, email } = user;
                    res.status(200).json({
                        message: 'You have login successfully',
                        token,
                        user: { _id, name, email }
                    })
                } else { return res.status(405).json({ message: 'Somethings went wrong' }); }
            } else { return res.status(403).json({ message: 'Somethings went wrong' }); }
        });

}


// module.exports.userDelete = async (req, res) => {
//     User.deleteOne({ email: req.body.email })
//         .exec(async (error, user) => {
//             if (user) return res.status(400).json({
//                 massage: "User Delete"
//             });
//         })
// }


// module.exports.userUpdate = async (req, res) => {
//     User.findOneAndUpdate({ email: req.body.email }, { "name": req.body.name }, { upsert: true }, function (err, doc) {
//         if (err) return res.send(500, { error: err });
//         return res.send('Succesfully saved.');
//     });
// }


// module.exports.add = async (req, res) => {
//     const user = req.body;
//     User.insertMany(user)
//         .then(result => {
//             console.log(result.insertedCount)
//             res.send(result.insertedCount);
//         })

// }




