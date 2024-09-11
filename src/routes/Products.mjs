import { Router } from "express";
const router = Router();

router.get("/api/products", (req, res) => {
  if (req.signedCookies.hello && req.signedCookies.hello === "world")
    return res.send([
      {
        id: 123,
        name: "Chicken breast",
        price: 12.99,
      },
    ]);

  return res.status(403).send({ msg: "Sorry, you need the correct cookie" });
});

export default router;
