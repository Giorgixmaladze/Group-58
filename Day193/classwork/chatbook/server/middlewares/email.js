const nodemailer = require("nodemailer");

transporter = nodemailer.createTransport({
    host:"sandbox.smtp.mailtrap.io",
    port:2525,
    auth: {
        user:"392ffa76692336",
        pass: "5ac879c6bc6172",
      }
})


const sendEmail = async (to,subject,text) => {
try{
    const mailOptions = {
        from: "noreply@example.com",
        to,
        subject,
        text,
        html: `<p>${text}</p>`
    }
    await transporter.sendMail(mailOptions)
}catch(error){
    console.error("Email sending error: ", error.message)
    throw error
}

}

sendEmail("xmaladzegiorgi2022@gmail.com","Test Subject","Test Body")