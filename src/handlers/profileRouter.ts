import { Response, Router } from "express";
import { body, header, param, query, validationResult } from "express-validator";
import { Request } from "express-validator/src/base";
import { ProfileService } from "../services/profileService";

export function profileRouter(): Router {
  const profileRoutes = Router();
  const profileService = new ProfileService();

  const profileChangeChain = [
    body("name")
      .optional()
      .notEmpty()
      .isString()
      .withMessage("name field should be a string"),
    body("secondName")
      .optional()
      .notEmpty()
      .isString()
      .withMessage("secondName field should be a string"),
    body("email")
      .optional()
      .notEmpty()
      .isString()
      .withMessage("email field should be a string"),
    body("gender")
      .optional()
      .notEmpty()
      .isIn(["Мужской", "Женский"])
      .withMessage("gender value is invalid"),
    body("photoPath")
      .optional()
      .notEmpty()
      .isBase64()
      .withMessage("photo field should be a base64 string")
      .custom((value) => {
        const img = Buffer.from(value);
        if (img.length / 1e6 > 10) {
          throw new Error("image should be less than 10mb");
        }
        return value;
      }),
    header("Authorization").exists(),
  ];

  profileRoutes.put(
    "",
    profileChangeChain,
    async (req: Request, res: Response) => {
      res.setHeader("Content-type", "application/json");

      const result = validationResult(req);

      if (result.isEmpty()) {
        let token;
        if (req.headers !== undefined) {
          const authHeader = req.headers["authorization"];
          token = authHeader.split("Bearer ")[1];
        }
        req.body.token = token;
        let data: any = {}
        for (const [key, value] of Object.entries(req.body)){
          if (value && key !== 'password' && key !== 'id' && key !== 'registrationDate'){
            data[key] = value 
          }
        }
        const response = await profileService.changeProfile(data, res);
        if (response !== undefined) {
          res.send(response);
        }
      } else {
        res.status(400);
        res.send({ errors: result.array() });
      }
    }
  );

  const profileGetChain = [
    param("id").isString().withMessage("id should be a string"),
  ];

  profileRoutes.get(
    "/:id",
    profileGetChain,
    async (req: Request, res: Response) => {
      res.setHeader("Content-type", "application/json");

      const result = validationResult(req);

      if (result.isEmpty()) {
        if (req.params !== undefined) {
          const id = req.params.id;
          const response = await profileService.getProfile(id, res);
          if (response !== undefined) {
            res.send(response);
          }
        }
      } else {
        res.status(400);
        res.send({ errors: result.array() });
      }
    }
  );

  const profilePaginationChain = [
    query("page").isInt().withMessage("page should be a number"),
  ];

  profileRoutes.get(
    "",
    profilePaginationChain,
    async (req: Request, res: Response) => {
      res.setHeader("Content-type", "application/json");

      const result = validationResult(req);

      if (result.isEmpty()) {
        if (req.query !== undefined) {
          const page = req.query.page;
          const response = await profileService.getWithPagination(page, res);
          if (response !== undefined) {
            res.send(response);
          }
        }
      } else {
        res.status(400);
        res.send({ errors: result.array() });
      }
    }
  );


  return profileRoutes;
}
