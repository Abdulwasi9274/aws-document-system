const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testDatabaseConnection } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Document Upload System API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);

    await testDatabaseConnection();
});