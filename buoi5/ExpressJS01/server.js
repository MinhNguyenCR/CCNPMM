require("dotenv").config();

const express = require("express");
const { configViewEngine } = require("./config/viewEngine");
const { connection } = require("./config/database");
const apiRoutes = require("./routes/api");
const cors = require("cors");

const app = express();

configViewEngine(app);
const PORT = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/v1/api', apiRoutes);
configViewEngine(app);
(async () => {
  try {
    await connection();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log("Failed to connect to MongoDB", e);
  }
})();
