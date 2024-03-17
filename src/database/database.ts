import { Sequelize } from "sequelize-typescript";
import { UserModel } from "./models/user.model";
import 'dotenv/config'

export function runDatabase(){
  const sequalize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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