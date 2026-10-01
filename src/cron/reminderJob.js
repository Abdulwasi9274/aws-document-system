import cron from "node-cron";

import { getPendingOrdersForReminder } from "../models/reminderModel.js";
import { sendMail } from "../utils/mail.js";

const sendPendingOrderReminders = async () => {
    try {
        console.log("Checking pending orders...");

        const orders = await getPendingOrdersForReminder();

        if (orders.length === 0) {
            console.log("No pending orders found");
            return;
        }

        let emailsSent = 0;

        for (const order of orders) {
            const subject = "Pending order reminder";
            const message = `Hello ${order.user_name},Your order is still pending....
            Order ID: ${order.order_id}
            Product: ${order.product_name}
            Quantity: ${order.quantity}
            Status: ${order.status}
            Please check your order! Thank you...`;

            try {
                await sendMail(
                    order.email,
                    subject,
                    message
                );

                emailsSent++;

                console.log(`Reminder sent to ${order.email} for Order ID ${order.order_id}`);

            } catch (error) {
                console.error(`failed to send email to ${order.email}`,
                    error.message
                );
            }
        }

        console.log(`Cron job completed and  emails sent: ${emailsSent}`);

    } catch (error) {
        console.error("Cron job error:",
            error
        );
    }
};

cron.schedule("0 21 * * *", () => {
    console.log("9 PM reminder cron started...");

    sendPendingOrderReminders();
});

console.log("Reminder cron job scheduled for 9:00 PM");