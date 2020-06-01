//  Import express
const express = require("express");
//  Import shortid
const shortid = require("shortid");
// shortid.characters("1234567890");
//  creating the server
const server = express();

//  middleware
server.use(express.json()); // parsing JSON from  the body

//  function to handle GET '/'
server.get("/", (req, res) => {
    res.status(200).json(`Hey there, welcome to port ${port}`);
});

//  list of users
let users = [
    {
        id: "1", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane", // String, required
    },
    {
        id: "2", // hint: use the shortid npm package to generate it
        name: "Jane Doe3", // String, required
        bio: "bio2", // String, required
    },
    {
        id: "3", // hint: use the shortid npm package to generate it
        name: "Jane Doe2", // String, required
        bio: "bio3", // String, required
    },
];
//  function to handle GET '/api/users'
server.get("/api/users", (req, res) => {
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved.",
        });
    }
});
//function to handle POST '/api/users'
server.post("/api/users", (req, res) => {
    const user = req.body;
    if (user.name === undefined || user.bio === undefined) {
        res.status(500).json({
            errorMessage:
                "There was an error while saving the user to the database",
        });
    } else if (user.name) {
        user.id = shortid.generate();
        users.push(user);
        res.status(201).json(users);
    } else if (user.name == "" || user.bio == "") {
        res.status(400).json({
            errorMessage: "Please provide name and / or bio for the user.",
        });
    }
});

//  function to handle GET to '/api/users/:id
server.get("/api/users/:id", (req, res) => {
    const selectedUser = users.filter((user) => {
        if (user.id === req.params.id) {
            return user;
        }
    });
    if (selectedUser.length > 0) {
        console.log(selectedUser);
        res.status(200).json(selectedUser);
    } else if (!selectedUser.name) {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        });
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved.",
        });
    }
});

//  function to handle DELETE to '/api/users/:id'
server.delete("/api/users/:id", (req, res) => {
    const delUser = users.filter((user) => {
        if (user.id === req.params.id) {
            return !user;
        } else return user;
    });
    res.status(200).json(delUser);
});

//  setting up the port
const port = 9000;
server.listen(port, () => {
    console.log(`server port ${port} is listening`);
    console.log(users);
});
