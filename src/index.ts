import express from "express";
import { runDatabase } from "./database/database";
import { userRouter } from "./handlers/userRouter";
import { profileRouter } from "./handlers/profileRouter";

const app = express();
const port = 3000;

runDatabase();

app.use(express.json({ limit: "50mb" }));
app.use("/user", userRouter());
app.use("/profile", profileRouter());

app.listen(port, () => {
  console.log("server's listening to port:", port);
});
