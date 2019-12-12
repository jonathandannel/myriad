const express = require('express');

const router = express.Router();

/* GET users listing. */

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  console.log(req.body);
  res.status(200);
  res.end();
});

module.exports = router;
