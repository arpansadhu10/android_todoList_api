const express = require('express');
const { register, login } = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/user');
const Testuser = require('../models/Testuser');
const User = require('../models/user');
const router = express.Router()


router.route('/').get(isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        console.log(user);

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        })
    }
})

router.route('/test').get((req, res) => {

    var obj = {
        username: "this is body",
        email: 4,
        password: "title",
        // userId: 5
    }
    res.status(200).send(obj)
})
router.route('/testpost').post(async (req, res) => {


    console.log(req.body)
    const { body, id, userId, title } = req.body

    const testuser = await Testuser.create({
        body, id, userId, title
    })
    testuser.save();


    res.send("success");

})


router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router;