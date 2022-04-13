const User = require('../models/user');
const bigPromise = require('../middlewares/bigPromise');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')


exports.register = bigPromise(async (req, res, next) => {
    // console.log("HELLOO");
    const { username, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.json({
                success: false,
                message: "User already exists"
            });

        }

        const user = await User.create({
            username: username,
            email: email,
            password: password
        })
        user.save()
        const token = user.getJwtToken()

        res.status(200).json({
            success: true,
            msg: "user created successfully",
            token: token
        })



    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: `user creation unsuccessfull , ${error.message}`,
            token: null
        })
    }
    // next();
})

exports.login = bigPromise(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        console.log("enter password and email...");
        return res.status(400).json({
            success: false,
            msg: 'enter email and password',
            token: undefined,
            user: undefined
        });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({
            success: false,
            msg: 'User not found in db',
            token: undefined,
            user: undefined
        });
    }

    const isPasswordValid = await user.isValidatedPassword(password);
    if (!isPasswordValid) {
        const variable =
        {
            success: false,
            msg: 'password wrong',
            token: undefined,
            user: undefined
        }


        return res.status(400).json(variable);
    }

    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload, process.env.JWT_SECRET,
        {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;

            res.status(200).json({
                success: true,
                msg: 'User logged in',
                token: token,
                user: user
            });
        }
    )



})