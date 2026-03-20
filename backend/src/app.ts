import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);


// app.get("/protected", authMiddleware, (req, res) => {
//   res.json({ message: "Access granted" });
// });

export default app;