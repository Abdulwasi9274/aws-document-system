import {
    createOrder,
    getAllOrders,
    getOrdersByUser,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} from "../models/orderModel.js";


export const addOrder = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const user_id = req.user.id;

        if (!product_id || !quantity) {
            return res.status(400).json({
                success: false,
                message: "userid, productid and quantity required for order",
                data: null
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "quantity must be greater than 0",
                data: null
            });
        }

        const result = await createOrder(
            user_id,
            product_id,
            quantity
        );

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: {
                id: result.insertId,
                user_id,
                product_id,
                quantity,
                status: "pending"
            }
        });

    } catch (error) {
        console.error("Add Order Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to place order",
            data: null
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await getAllOrders();

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        });

    } catch (error) {
        console.error("Get Orders Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            data: null
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        if (req.user.role !== "admin" && Number(req.user.id) !== Number(userId)) {
            return res.Status(403).json({
                success: false,
                message: "Access denied",
                data: null
            })
        }

        const orders = await getOrdersByUser(userId);

        return res.status(200).json({
            success: true,
            message: "User orders fetched successfully",
            data: orders
        });

    } catch (error) {
        console.error("get user orders Error", error);

        return res.status(500).json({
            success: false,
            message: "failed to fetch user orders",
            data: null
        });
    }
};

export const changeOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatus = [
            "pending",
            "completed",
            "cancelled"
        ];

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
                data: null
            });
        }

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be pending  completed or cancelled",
                data: null
            });
        }

        const existingOrder = await getOrderById(id);

        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
                data: null
            });
        }

        await updateOrderStatus(id, status);

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: {
                id: Number(id),
                status
            }
        });

    } catch (error) {
        console.error("Update Order Status Error:", error);

        return res.status(500).json({
            success: false,
            message: "failed to update order status",
            data: null
        });
    }
};

export const removeOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const existingOrder = await getOrderById(id);

        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
                data: null
            })
        }

        if (req.user.role !== "admin" && Number(req.user.id) !== Number(existingOrder.user_id)) {
            return res.status(403).json({
                success: false,
                message: "Access denied ",
                data: null
            })
        }

        await deleteOrder(id);

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: null
        });

    } catch (error) {
        console.error("delete order error", error);

        return res.status(500).json({
            success: false,
            message: "failed to cancel order",
            data: null
        })
    }
};