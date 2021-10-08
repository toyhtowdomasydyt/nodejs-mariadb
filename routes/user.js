const express = require('express');

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

  res.status(200).json({id: req.params.id});
});

module.exports = router;
