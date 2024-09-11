import { Router } from "express";
import userRouter from "./users.mjs";
import productsRouter from "./products.mjs"

const router = Router();

router.use(userRouter);
router.use(productsRouter);


export default router;