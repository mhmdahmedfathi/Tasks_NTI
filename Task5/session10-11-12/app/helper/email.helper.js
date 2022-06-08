const nodemailer = require("nodemailer")
const smtpConfig = {
    service:"gmail",
    auth:{
        user:"marwaradwan666@gmail.com",
        pass:"123@TechS"
    }
}
const sendMyEmail = async (reciverEmail, text, from, sub)=>{
    try{
        const transporter = await nodemailer.createTransport(smtpConfig)
        const mailOptions = {
            from:from,
            to: reciverEmail,
            subject:sub,
            html: text
        }
        await transporter.sendMail(mailOptions)
    }
    catch(e){
        console.log(e.message)
    }
}

module.exports = sendMyEmail