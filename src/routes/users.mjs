import { Router } from "express";
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { CreateUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const router = Router();

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters"),
  (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    const result = validationResult(req);
    console.log(result);

    const {
      query: { filter, value },
    } = req;

    //when filter and value are undefined
    // if (!filter && !value) return res.send(mockUsers);
    if (filter && value)
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));

    return res.send(mockUsers);
  }
);

router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

router.post(
  "/api/users",
  // [
  //   body("username")
  //     .notEmpty()
  //     .withMessage("username cannot be empty")
  //     .isLength({ min: 5, max: 32 })
  //     .withMessage("Username must be at least 5-32 characters")
  //     .isString("username must be a string!"),
  //   body("displayName").notEmpty(),
  // ]

  checkSchema(CreateUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);

    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });

    const data = matchedData(req);
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
  }
);

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  // const {
  //     body,
  //     params: { id },
  // } = req;

  // const parsedId = parseInt(id);
  // if (isNaN(parsedId)) return res.sendStatus(400);

  // const findUserIndex = mockUsers.findIndex(
  //     (user) => user.id === parsedId
  // );

  // if (findUserIndex === -1) return res.sendStatus(404);

  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };

  return res.sendStatus(200);
});

//patch request
router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

router.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);

  mockUsers.splice(findUserIndex, 1);
  return res.send(200);
});

export default router;
