const { pool } = require("../config/db");

// Create User
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        const [result] = await pool.execute(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            [name, email]
        );

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: result.insertId,
                name,
                email
            }
        });

    } catch (error) {
        console.error("Create user error:", error.message);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    }
};


// Get User By ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.execute(
            "SELECT id, name, email, created_at FROM users WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: rows[0]
        });

    } catch (error) {
        console.error("Get user error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to get user"
        });
    }
};


module.exports = {
    createUser,
    getUserById
};