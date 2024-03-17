import { Response, Router } from "express";
import { UserService } from "../services/userService";
import { body, validationResult } from "express-validator";
import { Request } from "express-validator/src/base";

export function userRouter(): Router {
  const userRoutes = Router();
  const userService = new UserService();

  const registratonChain = [
    body("email")
      .isEmail()
      .withMessage("email should be an email"),
    body("name")
      .isString()
      .withMessage("name should be a string"),
    body("password")
      .isString()
      .withMessage("password should be a string")
      .isLength({ min: 5 })
      .withMessage("password should be at least 5 characters"),
  ];

  userRoutes.post(
    "/register",
    registratonChain,
    async (req: Request, res: Response) => {
      res.setHeader("Content-type", "application/json");

      const result = validationResult(req);
      if (result.isEmpty()) {
        const response = await userService.registration(req.body, res);
        if (response !== undefined) {
          res.send(response);
        }
      } else {
        res.status(400);
        res.send({ errors: result.array() });
      }
    }
  );

  const loginChain = [
    body("email")
      .isEmail()
      .withMessage("email should be an email"),
    body("password")
      .isString()
      .withMessage("password should be a string")
      .isLength({ min: 5 })
      .withMessage("password should be at least 5 characters"),
  ];

  userRoutes.post("/login", loginChain, async (req: Request, res: Response) => {
    res.setHeader("Content-type", "application/json");

    const result = validationResult(req);
    if (result.isEmpty()) {
      const response = await userService.login(req.body, res);
      if (response !== undefined) {
        res.send(response);
      }
    } else {
      res.status(400);
      res.send({ errors: result.array() });
    }
  });

  return userRoutes;
}
