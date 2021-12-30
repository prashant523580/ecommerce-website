const jwt = require("jsonwebtoken");
exports.authorize =(req,res,next) => {
    if(req.headers.authorization){

        let token = req.headers.authorization;
        let user = jwt.verify(token, process.env.SECRET_KEY);
        
        // console.log({token,user})
        req.user = user;
    }else{

        return res.status(400).json({message : "authorization required"})
    }
    next()
}
exports.userMiddleware = async (req,res,next) => {
    // const token = req.cookies.jwt;
        // console.log(token)
        // const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        // const verifyUser = await User.findOne({_id:verifyToken._id ,"tokens:token": token});
        // console.log(verifyToken)
        if(req.user.role  !== "user"){
            return res.status(400).json({message:"access denied"})
        }
        next();
}
exports.adminMiddleware =async (req,res,next) => {
    try{

        // const token = req.cookies.jwt;
        // console.log(token)
        // const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        // const verifyUser = await User.findOne({_id:verifyToken._id ,"tokens:token": token});
        // console.log(verifyToken)
        if(req.user.role !== "admin"){
            return res.status(400).json({message:"access denied"})
        }
        next();
    }catch(err){
        res.status(422).json({err});
        console.log(`admin auth error ${err}`)
    }
}