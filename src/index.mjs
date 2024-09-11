import express from "express";

import userRouter from "./routes/users.mjs";
import productsRouter from "./routes/Products.mjs"

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productsRouter);

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendStatus(201).send({
    meg: "Server is up and running",
  });
});
