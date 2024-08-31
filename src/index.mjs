import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(201).send({ msg: "Hello" });
});

app.get("/api/users", (req, res) => {
    res.send([
        { id: 1, username: "Mitul", displayName: "Abu Al Nasir" },
        { id: 2, username: "Niloy", displayName: "Niloy Kumar" },
        { id: 3, username: "Mahfuz", displayName: "Mahfuzur Rahman" },
    ]);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});