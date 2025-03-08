import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"GoGrocer" <${process.env.EMAIL_USER}>`,
            to: sendTo,
            subject: subject,
            html: html,
        });
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        return null;
    }
};


export default sendEmail