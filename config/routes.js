const axios = require('axios');
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

const { authenticate, generate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  console.log(user)
  db    
    .insert(user)
    .into('users')
    .then(id => {
      db('users') 
        .then(users => {
          console.log(users)
          const user = users.pop();
          const token = generate(user);
          res.send(token);
        })
    })
    .catch(err => console.log(err));
}

function login(req, res) {
  const credentials = req.body;
  db('users')
    .where({ username: credentials.username })
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generate(user);
        res.json({token, username: user.username});
      } else {
        return res.status(401).json({ error: 'Incorrect Username or Password' });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
