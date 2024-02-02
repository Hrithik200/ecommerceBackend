const jwt=require("jsonwebtoken")

const generateToken=(id)=>{
return jwt.sign({id},"mySecret",{expiresIn:"1d"})
}
module.exports={generateToken}