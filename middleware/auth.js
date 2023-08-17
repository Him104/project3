const authorModel = require("../models/authorModel.js");
const jwt = require('jsonwebtoken'); 
const authentication = async function(req,res,next){
    try {
        const token = req.headers['x-api-key'];

        if (!token) {

            return res.status(400).send({status:false, msg: "Login is required, Token set in header"})
            
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

if (!decodedToken) {

    return res.status(400).send({status:false, msg:"Token is invalid"})
    
}
next();
    } catch (error) {

        res.status(500).send({msg:error.message})
        
    }
}

let authorization = async function(req,res,next){
    try {
        
        let token = req.headers['x-api-key'];

        let decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        let userId = req.params.userId;

        let user = await authorModel.findById(userId);

        if (!user) {

            return res.status(401).send({status:false, msg : "There is no data inside the database with this user id"});
            
        }

     if (decodedToken.userId != user.userId) {

        return res.status(401).send({status:false, msg : "You are not authorized"})
        
     }
        
        next()
    } 
    
    
    catch (error) {

        res.status(500).send({msg:error.message})
        
    }
}
module.exports.authorization=authorization;
module.exports.authentication = authentication;