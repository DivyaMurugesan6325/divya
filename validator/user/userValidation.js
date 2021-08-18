const {user} = require('./userSchema');
const {login} = require('./userSchema');
//middleware
//registeration validation
const addUserValidation =  async(req,res,next) =>{
    const value = await user.validate(req.body);
    if(value.error){
        res.json({
            success:0,
            message : value.error.details[0].message
        })
    }else{
        next();
    }

}

//loginvalidation
const loginValidation = async(req,res,next)=>{

const value = await login.validate(req.body);
if(value.error){
    res.json({
        success :0,
        message : value.error.details[0].message
    })
}else{
    next();
}
}




// eslint-disable-next-line no-undef
module.exports ={
    addUserValidation ,
    loginValidation ,
}