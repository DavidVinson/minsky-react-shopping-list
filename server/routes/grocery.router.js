const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//function to check for null values in grocery item
const isGroceryItemValid = (item) => {
  return Object.entries(item).every((i) => i.length > 1 && i[0] && (i[1] || i[1] === 0));
};

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
router.post('/', async (req, res) => {
  console.log(`POST grocery item: ${req.body}`);
  //sql statement
  const groceryItem = {
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
  };
  if (!isGroceryItemValid(groceryItem)) {
    console.log('Item Not valid!');
    res.status(201).send({ message: 'Invalid Grocery Item', item: { ...groceryItem } });
    return;
  } else {
    const sqlText = `
    INSERT INTO "grocery" ("name", "quantity", "unit") 
    VALUES ($1, $2, $3) RETURNING *;`;
    //use db pool
    try {
      const response = await pool.query(sqlText, [groceryItem.name, groceryItem.quantity, groceryItem.unit]);
      res.status(201).send(response.rows[0]);
    } catch (error) {
      console.error(`POST Server Error`, error);
      res.status(500).send(error);
    }
  }
});

//PUT
router.put('/:id', async (req, res) => {
  console.log(`UPDATE grocery item: ${req.params.id}`);
  //sql statement
  const groceryItem = {
    id: req.params.id,
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
  };
  if (!isGroceryItemValid(groceryItem)) {
    console.log('Item Not valid!');
    res.status(201).send({ message: 'Invalid Grocery Item', item: { ...groceryItem } });
    return;
  } else {
    const sqlText = `
      UPDATE "grocery" SET "name"=$2, "quantity"=$3, "unit"=$4  
      WHERE "id"=$1 RETURNING *;`;
    //use db pool
    try {
      const response = await pool.query(sqlText, [
        groceryItem.id,
        groceryItem.name,
        groceryItem.quantity,
        groceryItem.unit,
      ]);
      res.status(201).send(response.rows[0]);
    } catch (error) {
      console.error(`PUT Server Error`, error);
      res.status(500).send(error);
    }
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  console.log(`DELETE grocery item: ${req.params.id}`);
  //sql statement
  const sqlText = `DELETE FROM "grocery" WHERE "id"=$1;`;
  //use db pool
  try {
    await pool.query(sqlText, [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error(`DELETE Server Error`, error);
    res.status(500).send(error);
  }
});

module.exports = router;
