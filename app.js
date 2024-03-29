import express from "express";
import morgan from "morgan";
import connectDb from "./data/mongoose.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import colors from "colors";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import droneRoutes from "./routes/droneRoute.js";
import dispatchRoutes from "./routes/dispatchRoute.js";
import medicationRoutes from "./routes/medicationRoute.js";
import logger from "./utils/default.logger.js";

connectDb();

const app = express();

//enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 4 * 1024 * 1024 * 1024, //4MB max file(s) size
    },
  })
);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//make uploads directory static
app.use(express.static("uploads"));

app.use("/api/drone", droneRoutes);
app.use("/api/dispatch", dispatchRoutes);
app.use("/api/medication", medicationRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(notFound);
app.use(errorHandler);

export default app;
