const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dotenv config
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

// port
const PORT = process.env.PORT || 5000;

// start server only after DB connects
const startServer = async () => {
  try {
    await connectDB(); // ⏸ wait for MongoDB

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
