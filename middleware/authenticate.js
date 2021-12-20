const jwt = require("jsonwebtoken");
const User = require("../models/user");


const authenticate = async (req,res,next)=>
{
    try
    {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token":token});
        
        if(!rootUser)
        {
            throw new Error("User doesn't exist");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    }
    catch(err)
    {
        res.status(401).send("Unauthorized");
        console.log(err);
    }

    
}

module.exports = authenticate;