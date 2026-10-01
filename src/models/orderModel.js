import db from "../config/db.js";


export const createOrder = async (user_id, product_id, quantity) => {
    const [result] = await db.query(
        `INSERT INTO orders (user_id, product_id, quantity, status)
         VALUES (?, ?, ?, ?)`,
        [user_id, product_id, quantity, "pending"]
    );

    return result;
};


export const getAllOrders = async () => {
    const [rows] = await db.query(
        `SELECT 
            orders.id,
            orders.user_id,
            users.name AS user_name,
            orders.product_id,
            products.name AS product_name,
            orders.quantity,
            orders.status,
            orders.created_at
         FROM orders
         JOIN users ON orders.user_id = users.id
         JOIN products ON orders.product_id = products.id
         ORDER BY orders.id DESC`
    );

    return rows;
};

export const getOrdersByUser = async (user_id) => {
    const [rows] = await db.query(
        `SELECT 
            orders.id,
            orders.user_id,
            orders.product_id,
            products.name AS product_name,
            products.price,
            orders.quantity,
            orders.status,
            orders.created_at
         FROM orders
         JOIN products ON orders.product_id = products.id
         WHERE orders.user_id = ?
         ORDER BY orders.id DESC`,
        [user_id]
    );

    return rows;
};


export const getOrderById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM orders WHERE id = ?`,
        [id]
    );

    return rows[0];
};


export const updateOrderStatus = async (id, status) => {
    const [result] = await db.query(
        `UPDATE orders SET status = ? WHERE id = ?`,
        [status, id]
    );

    return result;
};

export const deleteOrder = async (id) => {
    const [result] = await db.query(
        `DELETE FROM orders WHERE id = ?`,
        [id]
    );

    return result;
};