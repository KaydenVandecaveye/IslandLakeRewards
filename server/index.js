const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const dealRoutes = require("./routes/dealRoutes");

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/deal", dealRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
