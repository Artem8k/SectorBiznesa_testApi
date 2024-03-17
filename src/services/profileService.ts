import { Response } from "express";
import { UserModel } from "../database/models/user.model";
import { profileChangeDto } from "../dto/profile.dto";
import { verify } from "jsonwebtoken";
import { writeFile } from "fs/promises";
import { writeFileSync } from "fs";

interface Profile {
  changeProfile(
    data: profileChangeDto,
    res: Response
  ): Promise<ProfileData | undefined>;
  getProfile(id: string, res: Response): Promise<ProfileData | undefined>;
  getWithPagination(
    page: number,
    res: Response
  ): Promise<ProfileData[] | undefined>;
}

type ProfileData = {
  id: string;
  name: string;
  secondName: string | null;
  email: string;
  gender: string | null;
  photoPath: string | null;
  registrationDate: number;
};

type Error = {
  status: number;
  error: string;
};

export class ProfileService implements Profile {
  constructor() {}

  async changeProfile(
    data: profileChangeDto,
    res: Response
  ): Promise<ProfileData | undefined> {
    if (process.env.JWT_SECRET === undefined) {
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

    let payload: any;
    try {
      payload = verify(data.token, process.env.JWT_SECRET); // ошибку если expired
    } catch (error) {
      this.errorHandler(
        {
          status: 401,
          error: "Token expired",
        },
        res
      );
      return;
    }

    let photoPath = undefined;
    if (data.photoPath) {
      photoPath = "./photos/" + `${payload.id}.jpeg`;
      try {
        await writeFile(photoPath, data.photoPath, "base64");
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
    }

    data.photoPath = photoPath;
    await UserModel.update(
      {
        ...data,
      },
      { where: { id: payload.id } }
    );

    const user = await UserModel.findOne({
      where: { id: payload.id },
    });

    if (user !== null) {
      return {
        id: user.id,
        name: user.name,
        secondName: user.secondName,
        email: user.email,
        gender: user.gender,
        photoPath: user.photoPath,
        registrationDate: user.registrationDate,
      };
    }
  }

  async getProfile(
    id: string,
    res: Response
  ): Promise<ProfileData | undefined> {
    let user;
    try {
      user = await UserModel.findOne({
        where: {
          id: id,
        },
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

    return {
      id: user.id,
      name: user.name,
      secondName: user.secondName,
      email: user.email,
      gender: user.gender,
      photoPath: user.photoPath,
      registrationDate: user.registrationDate,
    };
  }

  async getWithPagination(
    page: number,
    res: Response
  ): Promise<ProfileData[] | undefined> {
    const offset = page === 1 ? 0 : (page - 1) * 10;
    let usersRaw: UserModel[];
    try {
      usersRaw = await UserModel.findAll({
        offset: offset,
        limit: 10,
        order: [["registrationDate", "ASC"]],
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

    const users: ProfileData[] = usersRaw.map((val) => {
      return {
        id: val.id,
        name: val.name,
        secondName: val.secondName,
        email: val.email,
        gender: val.gender,
        photoPath: val.photoPath,
        registrationDate: val.registrationDate,
      };
    });

    return users;
  }

  private errorHandler(error: Error, res: Response) {
    res.setHeader("Content-Type", "application/json");
    res.status(error.status);
    res.send(error);
  }
}
