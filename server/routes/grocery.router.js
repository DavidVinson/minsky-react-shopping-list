const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET
router.get('/', async (req, res) => {
  console.log('GET groceries...');
  //sql statement
  const sqlText = `SELECT * FROM "grocery";`;
  //use db pool
  try {
    const response = await pool.query(sqlText);
    res.send(response.rows);
  } catch (error) {
    console.error(`GET Server Error`, error);
    res.status(500).send(error);
  }
});

//POST

//PUT

//DELETE

module.exports = router;
