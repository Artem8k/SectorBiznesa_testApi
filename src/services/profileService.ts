import { authDto, registrationDto } from "../dto/user.dto";
import { UserModel } from "../database/models/user.model";
import { Request, Response } from "express";
import { Hash, createHash, randomUUID, verify } from "crypto";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { profileChangeDto } from "../dto/profile.dto";

interface Profile {
  changeProfile(data: profileChangeDto): Promise<ProfileData | Error>; // получить id пользователя из access токена
  getProfile(id: string): Promise<ProfileData | Error>;
  getWithPagination(page: number): Promise<ProfileData[] | Error>;
}

type ProfileData = {
  id: string;
  name: string;
  secondName: string;
  email: string;
  sex: string;
  photoPath: string;
  registrationDate: number;
};

type Error = {
  status: number;
  error: string;
};

export class ProfileService implements Profile {
  constructor() {}

  async changeProfile(data: profileChangeDto): Promise<ProfileData | Error> {
    // [key as keyof profileChangeDto]
    // заранее в контроллере убрать property которые равны null
    // так же в контроллере заранее получить id из access токена
    // обновить данные если property не null
    for (const [key, value] of Object.entries(data)) {
      if (value !== null) {
        await UserModel.update(
          {
            ...data,
          },
          { where: {id: data.id} }
        );
      } else {
        continue;
      }
    }
    return {
      id: "",
      name: "",
      secondName: "",
      email: "",
      sex: "",
      photoPath: "",
      registrationDate: 123,
    };
  }

  async getProfile(id: string): Promise<ProfileData | Error> {
    return {
      id: "",
      name: "",
      secondName: "",
      email: "",
      sex: "",
      photoPath: "",
      registrationDate: 123,
    };
  }

  async getWithPagination(page: number): Promise<ProfileData[] | Error> {
    return [
      {
        id: "",
        name: "",
        secondName: "",
        email: "",
        sex: "",
        photoPath: "",
        registrationDate: 123,
      },
    ];
  }
}
