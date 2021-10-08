const express = require('express');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  res.status(200).json({id: req.params.id});
});

module.exports = router;
