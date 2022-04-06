const express = require('express');
const { register, login } = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/user');
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
router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router;