const express = require("express");
const app = express();
const PORT = 5001;

app.use(express.json());

app.post("/api/logs", (req, res) => {
  console.log("Log received:", req.body);
  res.json({ status: "success" });
});

app.listen(PORT, () => {
  console.log(`✅ Logging Middleware running on http://localhost:${PORT}`);
});
