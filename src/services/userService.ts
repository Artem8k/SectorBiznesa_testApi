import { authDto, registrationDto } from "../dto/user.dto";
import { UserModel } from "../database/models/user.model";
import { Response } from "express";
import { randomUUID } from "crypto";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import 'dotenv/config'

interface User {
  registration(
    data: registrationDto,
    res: Response
  ): Promise<JwtToken | undefined>;
  login(data: authDto, res: Response): Promise<JwtToken | undefined>;
}

type JwtToken = {
  accessToken: string;
};

type Error = {
  status: number;
  error: string;
};

type JwtPayload = {
  id: string;
  name: string;
  email: string;
};

export class UserService implements User {
  constructor() {}

  async registration(
    data: registrationDto,
    res: Response
  ): Promise<JwtToken | undefined> {
    // проверяю существует ли пользователь с email из запроса
    let user;
    try {
      user = await UserModel.findOne({
        where: { email: data.email },
      });
    } catch (error) {
      console.log(error);
      this.errorHandler(
        {
          status: 500,
          error: "Internal server error",
        },
        res
      );
      return;
    }

    if (user !== null) {
      this.errorHandler(
        {
          status: 400,
          error: "User already exists",
        },
        res
      );
      return;
    }

    // хеширую пароль и сохраняю пользователя в бд
    let newUser;
    try {
      const passHash = await hash(data.password, 5);
      newUser = await UserModel.create({
        id: randomUUID(),
        name: data.name,
        email: data.email,
        password: passHash,
        registrationDate: Math.floor(new Date().getTime() / 1000), //UNIX TIMESTAMP
      });
    } catch (error) {
      console.log(error);
      this.errorHandler(
        {
          status: 500,
          error: "Internal Server Error",
        },
        res
      );
      return;
    }

    // создаю jwt токен
    const payload: JwtPayload = {
      id: newUser.id,
      name: data.name,
      email: data.email,
    };

    if(process.env.JWT_SECRET === undefined){
      console.log("jwt secret is undefined");
      this.errorHandler(
        {
          status: 500,
          error: "Internal Server Error",
        },
        res
      );
      return;
    }

    const token = sign(payload, process.env.JWT_SECRET, {
      // спрятать в env
      expiresIn: "15m",
    });

    return {
      accessToken: token,
    };
  }

  async login(data: authDto, res: Response): Promise<JwtToken | undefined> {
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
      console.log(error);
      this.errorHandler(
        {
          status: 500,
          error: "Internal server error",
        },
        res
      );
      return;
    }

    if (user === null) {
      console.log("user not found");
      this.errorHandler(
        {
          status: 404,
          error: "User not found",
        },
        res
      );
      return;
    }

    // сравниваю пароль в бд и в запросе
    const doesPassCompare = await compare(data.password, user.password);
    if (doesPassCompare === false) {
      console.log("wrong pass");
      this.errorHandler(
        {
          status: 400,
          error: "Wrong password",
        },
        res
      );
      return;
    }

    if(process.env.JWT_SECRET === undefined){
      console.log("jwt secret is undefined");
      this.errorHandler(
        {
          status: 500,
          error: "Internal Server Error",
        },
        res
      );
      return;
    }


    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: data.email,
    };
    
    const token = sign(payload, process.env.JWT_SECRET, {
      // спрятать в env
      expiresIn: "15m",
    });
    return {
      accessToken: token,
    };
  }

  private errorHandler(error: Error, res: Response) {
    res.setHeader("Content-Type", "application/json");
    res.status(error.status);
    res.send(error);
  }
}
