import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '../models/User';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPassword: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000,
            })
        }
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "",
              pass: ""
            }
          });
        const mailOptions = {
            from: 'abdulrazzak4186@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Your Password', // Subject line
            text: "Hello everyone , i'm a Software Engineer", // plain text body
            html: `<p> Click <a href="${process.env.DOMAIN}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}  or copy and paste the link below in your browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`, // html body
        }
        console.log('transport : ',transporter,mailOptions);
        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;
    } catch (error) {
        console.log('error in sending mail to ' + email + ' is ' + error);
    }
}