import { Sequelize } from "sequelize-typescript";
import { UserModel } from "./models/user.model";

export function runDatabase(){
  const sequalize = new Sequelize({
    dialect: "postgres",
    host: "titania.bluerats.ru",
    port: 5432,
    username: "viportal",
    password: "78978464648646vi",
    database: "testZadanie",
    models: [UserModel],
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
  try {
    sequalize.authenticate()
  } catch (error) {
    console.log(error)
  }
}