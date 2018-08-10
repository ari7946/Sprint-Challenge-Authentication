const { server } = require('./server');
// const express = require('express');
// const cors = require('cors');

const port = process.env.PORT || 5000;

server.use(express.json());
server.use(cors({origin: 'http://localhost:3000', credentials:true}));

server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
