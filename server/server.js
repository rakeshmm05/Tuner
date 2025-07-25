const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/preferences", require("./routes/preferences"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
