import express, { Express } from "express";
import { runDatabase } from "./database/database";
import { UserService } from "./services/userService";

const app = express();
const port = 3000;

runDatabase();
const user = new UserService().login({
  email: "1234@test.com",
  password: "1233",
});
app.listen(port, () => {
  console.log("server's listening to port:", port);
});
