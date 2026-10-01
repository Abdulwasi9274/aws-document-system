import db from "../config/db.js";

export const createUser = async (name, email, password, role) => {
    const [result] = await db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, password, role]
    );

    return result;
};

export const getUserByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
};

export const getUsers = async () => {
    const [rows] = await db.query(
        "SELECT id, name, email, role, created_at FROM users"
    );

    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await db.query(
        "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
        [id]
    );

    return rows[0];
};

export const updateUser = async (id, name, email) => {
    const [result] = await db.query(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [name, email, id]
    );

    return result;
};

export const deleteUser = async (id) => {
    const [result] = await db.query(
        "DELETE FROM users WHERE id = ?",
        [id]
    );

    return result;
};