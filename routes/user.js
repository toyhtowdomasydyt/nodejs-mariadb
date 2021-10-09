const express = require('express');
const bcrypt = require('bcrypt');

const pool = require('../helpers/database');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const sqlQuery = 'SELECT id, email, created_at FROM user WHERE id=?';
    const rows = await pool.query(sqlQuery, req.params.id);

    res.status(200).json(rows);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const sqlQuery = 'INSERT INTO user (email, password) VALUES (?,?)';
    const result = await pool.query(sqlQuery, [email, encryptedPassword]);

    res.status(200).json(result);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const {id, enteredPassword} = req.body;

    const sqlGetUser = 'SELECT password FROM user WHERE id=?';
    const rows = await pool.query(sqlGetUser, id);

    if (rows) {
      const isValid = await bcrypt.compare(enteredPassword, rows[0].password);

      return res.status(200).json({isPasswordValid: isValid});
    }

    res.status(200).send(`User with id ${id} was not found`);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
