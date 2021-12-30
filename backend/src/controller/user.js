const User = require("../models/user");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator"); 
exports.signin = async (req, res) => {
    try {
        
        const {
            email_user,
            password
        } = req.body;
        console.log(email_user, password);
        if (!email_user || !password) {
            return res.status(422).json({
                error: "fill data"
            })
        }
        let verifyUser = await User.findOne({
            username: email_user
        }) || await User.findOne({
            email: email_user
        });
        // console.log(verifyUser)
        if (verifyUser) {
            const isMatch = await bcrypt.compare(password, verifyUser.password);
            const token = await verifyUser.generateToken();
            res.cookie("jwt", token, {
                expire: "1hrs",
                httpOnly: true
            })
            // console.log(token)
            if (!isMatch && verifyUser.role === "admin") {
                res.status(422).json({
                    error: "user login error"
                });
            } else {
                res.status(200).json({
                    message: "user login success",
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
    const {
        name,
        username,
        email,
        password,
        phone
    } = req.body;
    // if(!name || !username|| !email || !password){
    //     res.status(422).json({
    //         error : "invalid inputs"
    //     })
    // }
    try {
        
        let existUser = await User.findOne({
            email: email
        }) || await User.findOne({
            username:username
        });
        if (existUser) {
            console.log("true")
            res.status(400).json({
                error: "already exist"
            })
        }
        const user = await new User({
            name,
            username,
            email,
            phone,
            password,
            role:"user"
        });
        console.log(user)
        await user.save();
        res.status(201).json({
            message: "user registered successfully"
        })
    } catch (err) {
        console.log(err)
    }
}
exports.requireSignin =(req,res,next) =>{
    const token = req.headers.authorization;
    const user = jwt.verify(token,process.env.SECRET_KEY);

    req.user = user;
    next();
}