const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRequest } = require("../../validators/validator");
const { response } = require("express");
exports.signin = async (req, res) => {
    try {
        const {
            email_user,
            password
        } = req.body;
        // console.log(email_user, password);
        if (!email_user || !password) {
            return res.status(422).json({
                error: "fill data"
            })
        }
        const verifyUser = await User.findOne({
            username: email_user
        }) || await User.findOne({
            email: email_user
        });
        
        if (verifyUser) {
            const isMatch = await bcrypt.compare(password, verifyUser.password);
            const token = await verifyUser.generateToken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 2900000),
                httpOnly: true,
            })
            // console.log(token)
            if (!isMatch || verifyUser.role === "user") {
                res.status(422).json({
                    error: "admin login error"
                });
            } else {
                console.log(verifyUser)
                res.status(200).json({
                    message: "admin login success",
                    token,
                    user : verifyUser
                })
            }
        } else {
            res.status(400).json({
                error: "login error"
            })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.signup = async (req, res) => {
    try {
        // const errors = validateRequest(req);
        // return response.status(400).json({error: errors.array()})
        const {
            name,
            email,
            username,
            password
        } = req.body;
        let existUser = await User.findOne({
            email: email
        });
        if (existUser) {
            // console.log("true")
            res.status(422).json({
                error: "admin already exist"
            })
        }else{

            const user = await new User({
                name,
                username ,
                email,
                password,
                role : "admin"
            })
            const token = await user.generateToken();
            console.log(user)
            await user.save();
            res.status(201).json({
                message: "admin registered successfully",
                user ,
                token
            })
        }
        } catch (err) {
            res.status(422).json({err})
        }
}

exports.signout = (req,res) => {
        res.clearCookie("token");
        res.clearCookie("jwt");
        res.status(200).json({
            message:"sign out successfully"
        })
}