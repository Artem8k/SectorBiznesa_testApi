import { authDto, registrationDto } from "../dto/user.dto";
import { UserModel } from "../database/models/user.model";
import { Request, Response } from "express";
import { Hash, createHash, randomUUID, verify } from "crypto";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

interface User {
  registration(data: registrationDto): Promise<JwtToken | Error>;
  login(data: authDto): Promise<JwtToken | Error>;
}

type JwtToken = {
  accessToken: string;
};

type Error = {
  status: number;
  error: string;
};

type JwtPayload = {
  name: string,
  email: string
}

export class UserService implements User {
  constructor() {}

  async registration(data: registrationDto): Promise<JwtToken | Error> {
    // проверяю существует ли пользователь с email из запроса
    let user;
    try {
      user = await UserModel.findOne({
        where: { email: data.email },
      });
    } catch (error) {
      console.log(error)
      return {
        status: 123,
        error: "!23",
      };
    }

    if (user !== null) {
      return {
        status: 401,
        error: "User already exists",
      };
    }

    // хеширую пароль и сохраняю пользователя в бд
    try {
      const passHash = await hash(data.password, 5);
      await UserModel.create({
        id: randomUUID(),
        name: data.name,
        email: data.email,
        password: passHash,
        registrationDate: Math.floor(new Date().getTime() / 1000), //UNIX TIMESTAMP
      });
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        error: "Internal server error",
      };
    }

    // создаю jwt токен
    const payload: JwtPayload = {
      name: data.name,
      email: data.email
    } 
    const token = sign(payload, "SECRET", { // спрятать в env
      expiresIn: "15m"
    })

    return {
      accessToken: token
    };
  }

  async login(data: authDto): Promise<JwtToken | Error> {
    // посмотреть существует ли пользователь в бд
    // сравнить хеш пароля в бд и из запроса
    // вернуть access токен

    // проверяю существует ли пользователь в бд
    let user;
    try {
      user = await UserModel.findOne({
        where: { email: data.email },
      });
    } catch (error) {
      console.log(error)
      return {
        status: 123,
        error: "!23",
      };
    }

    if (user === null) {
      console.log("user not found")
      return {
        status: 404,
        error: "User not found",
      };
    }

    // сравниваю пароль в бд и в запросе
    const doesPassCompare = await compare(data.password, user.password)
    if (doesPassCompare === false) {
      console.log("wrong pass")
      return {
        status: 401,
        error: "Wrong password",
      };
    }

    const payload: JwtPayload = {
      name: user.name,
      email: data.email
    } 
    const token = sign(payload, "SECRET", { // спрятать в env
      expiresIn: "15m"
    })
    console.log(token)
    return {
      accessToken: token,
    };
  }
}
