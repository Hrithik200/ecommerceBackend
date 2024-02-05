const mongoose=require("mongoose");

const validateMongoDbId=(id)=>{
  console.log("The id in Validate",id)
  const isValid=mongoose.Types.ObjectId.isValid(id);
  console.log("isValid",isValid)
  if(!isValid){
    throw new Error("This id is not valid or not found ")
  }

};
module.exports=validateMongoDbId