const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const { askGPT } = require("./routes/gpt_helper");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/ask", async (req, res) => {
  const { message } = req.body;
  try {
    const reply = await askGPT(message);
    res.json({ reply });
  } catch (err) {
    console.error("Lỗi GPT:", err);  // ← DÒNG NÀY RẤT QUAN TRỌNG
    res.status(500).json({ reply: "Lỗi khi gọi GPT." });
  }
});

mongoose
  .connect("mongodb://localhost:27017/user_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const path = require("path");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Home.html"));
});

app.use("/api", authRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

