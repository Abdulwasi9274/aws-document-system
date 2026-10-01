import { sendMail } from "../utils/mail.js";

export const sendTestMail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email required",
                data: null
            });
        }

        await sendMail(
            email,
            "test mail Backendtask",
            "Hello... this is a test email sent "
        );

        return res.status(200).json({
            success: true,
            message: "test email sent successfully",
            data: { email }
        })

    } catch (error) {
        console.error("Send test mail error", error);

        return res.status(500).json({
            success: false,
            message: "failed to send test email",
            data: null,
        });
    }
};