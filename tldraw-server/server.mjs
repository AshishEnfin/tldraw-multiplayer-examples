import express, { json, urlencoded } from "express";
const app = express();
import cors from "cors";
import { notFound } from "./handlers/errorHandlers.mjs";
import dotenv  from "dotenv"
import pusherRouter from "./routes/pusherRoutes.mjs";
dotenv.config()

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1/", pusherRouter);

app.use(notFound);

app.set("port", process.env.PORT || 8888);

const server = app.listen(app.get("port"), (err) => {
  if(err) console.log(err);
  return console.log("Express server running on port " + app.get("port"));
});
