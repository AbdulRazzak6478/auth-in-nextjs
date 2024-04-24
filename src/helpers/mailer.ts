import nodemailer from 'nodemailer';

export const sendEmail = async({email , emailType, userId}:any) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });
          const mailOptions = {
            from: 'abdul123@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Your Password', // Subject line
            text: "Hello everyone , i'm a Software Engineer", // plain text body
            html: "<b>Hello world?</b>", // html body
          }
          const mailResponse = await transporter.sendMail(mailOptions);

          return mailResponse;
    } catch (error) {
        console.log('error in sending mail to '+email+' is '+error);
    }
}