import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import shopsRoute from "./routes/shops/shopsRoute.js";
import usersRoute from "./routes/user/usersRoute.js";
import historyRoute from "./routes/history/historyRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/shops", shopsRoute);
app.use("/users", usersRoute);
app.use("/history", historyRoute);

app.use((req, res) => {
  res.status(404).json({ message: "404 Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(process.env.PORT || 8080, function () {
  console.log(
    `CORS-enabled web server listening on port ${process.env.PORT || 8080}`
  );
});

export default app;
