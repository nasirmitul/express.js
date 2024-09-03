import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
    { id: 1, username: "Mitul", displayName: "Abu Al Nasir" },
    { id: 2, username: "Niloy", displayName: "Niloy Kumar" },
    { id: 3, username: "Mahfuz", displayName: "Mahfuzur Rahman" },
]

app.get("/", (req, res) => {
    res.status(201).send({ msg: "Hello" });
});

app.get("/api/users", (req, res) => {
    console.log(req.query);
    const {
        query: { filter, value },
    } = req;

    //when filter and value are undefined
    // if (!filter && !value) return res.send(mockUsers);

    if (filter && value)
        return res.send(
            mockUsers.filter((user) => user[filter].includes(value))
        );

    return res.send(mockUsers)

});

//post request
app.post("/api/users", (req, res) => {
    console.log(req.body);
    const { body } = req;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser)
    return res.status(201).send(newUser)
})


//route parameters
app.get('/api/users/:id', (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) return res.status(400).send({ msg: 'Bad Request. Invalid Number' });

    const findUser = mockUsers.find((user) => user.id === parsedId)
    if (!findUser) return res.sendStatus(404);
    return res.send(findUser);
})


//put request
app.put("/api/users/:id", (req, res) => {
    const {
        body,
        params: { id },
    } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findUserIndex = mockUsers.findIndex(
        (user) => user.id === parsedId
    );

    if (findUserIndex === -1) return res.sendStatus(404);

    mockUsers[findUserIndex]= {id: parsedId, ...body};
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});