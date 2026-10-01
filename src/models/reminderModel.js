import db from "../config/db.js";

export const getPendingOrdersForReminder = async () => {
    const [rows] = await db.query(
        `SELECT
            orders.id AS order_id,
            orders.quantity,
            orders.status,
            users.id AS user_id,
            users.name AS user_name,
            users.email,
            products.name AS product_name
         FROM orders
         JOIN users ON orders.user_id = users.id
         JOIN products ON orders.product_id = products.id
         WHERE orders.status = 'pending'
         ORDER BY orders.id DESC`
    );

    return rows;
};