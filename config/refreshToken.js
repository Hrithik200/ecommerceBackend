const jwt=require("jsonwebtoken")

const generateRefreshToken=(id)=>{
return jwt.sign({id},"mySecret",{expiresIn:"3d"})
}
module.exports={generateRefreshToken}