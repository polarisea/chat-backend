import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import https from "https";
import { readFileSync } from "fs";
import path from "path";

import { Child, Parrent } from "./models/Test.model";

import { notFound, errorHandler } from "./middlewares/error.middleware";

import { usersApi } from "./apis/users.api";
config();
const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017";
const PORT = process.env.PORT || 2030;
const options = {
  key: readFileSync("cert/server.key"),
  cert: readFileSync("cert/server.cert"),
};

const app: Application = express();
app.use(cors());
// app.use("/static", express.static(TARGET_PATH + "public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_URI, { dbName: "chat-app" })
  .then(async () => {
    console.log("Connection to mongoose sucessful!");
    https.createServer(options, app).listen(PORT, () => {
      console.log("Sever started at port: ", PORT);
    });

    const child = await Child.create({
      name: "Child name",
    });
    const child1 = await Child.create({
      name: "Child name 1",
    });
    const parent = await Parrent.create({
      name: "Parent name",
      child: child._id,
    });
    const parents = await Parrent.find({ name: "Parent name" }).populate(
      "child",
      "-_id -name"
    );
    console.log(parents);
  })
  .catch((e) => {
    console.log("Connection to mongoose failed!");
    console.log(e);
  });

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.use("/api/users", usersApi);

app.use(notFound);
app.use(errorHandler);
