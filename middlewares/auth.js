// to poduct some route 
const jwt = require('jsonwebtoken');
//middlewares
function checkauth(req,res,next){
   try{
        const token = req.headers.authorization.split(" ")[1];
        // eslint-disable-next-line no-undef
        const decodedtoken = jwt.verify(token,process.env.JWT_KEY);
        req.userData = decodedtoken;
        next();
 }catch(err){
            return res.status(401).json({
                err : err
            })
         }
}
module.exports = {
    checkauth 
}