import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();


const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

export const sendMail = async (to, subject, text) => {
    try {

        const info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            text
        });

        console.log("Email sent", info.messageId);

        return info;

    } catch (error) {
        console.error("Email sending error", error);
        throw error;
    }
};