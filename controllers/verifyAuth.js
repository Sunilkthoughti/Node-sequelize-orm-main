const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    try{
        const token = req.header('auth-token');
        if(!token){
            return res.status(400).send('Access Denied')
        }
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.student = verified
        next();
    }
    catch(e){
        console.log(e)
    }
}