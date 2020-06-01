//  Import express
const express = require('express');
//  Import shortid
const shortid = require('shortid');

//  creating the server
const server = express();

//  middleware
server.use(express.json()); // parsing JSON from  the body

//  function to handle GET '/'
server.get('/', (req, res) => {
    res.status(200).json(`Hey there, welcome to port ${port}`);
});

//  list of users
let users = [
    {
        id: 'a_unique_id', // hint: use the shortid npm package to generate it
        name: 'Jane Doe', // String, required
        bio: "Not Tarzan's Wife, another Jane", // String, required
    },
];
//  function to handle GET '/api/users'
server.get('/api/users', (req, res) => {
    res.status(200).json(users);
});
//function to handle POST '/api/users'
server.post('/api/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(users);
});

//  setting up the port
const port = 9000;
server.listen(port, () => {
    console.log(`server port ${port} is listening`);
});
