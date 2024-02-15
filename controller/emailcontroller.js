const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const { send } = require("process");


const sendEmail=asyncHandler(async(data,req,res)=>{
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'marianne.von@ethereal.email',
        pass: 'rDFut1YrTC8GeUhVZw'
    }
});
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Hey 👻" <abc@gmail.com>', // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html:data.html, // html body
    });
    console.log("Message sent: %s", info.messageId);
}
main()})


module.exports=sendEmail