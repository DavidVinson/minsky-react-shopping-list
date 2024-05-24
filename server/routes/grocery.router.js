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
  const sqlText = `SELECT * FROM "grocery" ORDER BY "name" ASC;`;
  //use db pool
  try {
    const result = await pool.query(sqlText);
    res.send(result.rows);
  } catch (error) {
    console.error(`GET Server Error`, error);
    res.status(500).send(error);
  }
});

//POST
router.post('/', async (req, res) => {
  console.log(`POST grocery item:`, req.body);
  //sql statement
  const groceryItem = {
    name: req.body.name,
    quantity: Number(req.body.quantity),
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
      const result = await pool.query(sqlText, [groceryItem.name, groceryItem.quantity, groceryItem.unit]);
      res.status(201).send(result.rows[0]);
    } catch (error) {
      console.error(`POST Server Error`, error);
      res.status(500).send(error);
    }
  }
});

// PUT update purchase reset
router.put('/purchase/reset', async (req, res) => {
  console.log(`UPDATE grocery item purhase RESET`);
  //sql statement
  const sqlText = `
    UPDATE "grocery" SET "purchased"=false;`;
  //use db pool
  try {
    await pool.query(sqlText);
    res.sendStatus(201);
  } catch (error) {
    console.error(`PUT/PURCHASE RESET Server Error`, error);
    res.status(500).send(error);
  }
});

// PUT update purchase
router.put('/purchase/:id', async (req, res) => {
  console.log(`UPDATE grocery item purhase: ${req.params.id}`);
  //sql statement
  const sqlText = `
    UPDATE "grocery" SET "purchased"=NOT "purchased" WHERE "id"=$1 RETURNING *;`;
  //use db pool
  try {
    const result = await pool.query(sqlText, [req.params.id]);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error(`PUT/PURCHASE Server Error`, error);
    res.status(500).send(error);
  }
});

//PUT regular update
router.put('/:id', async (req, res) => {
  console.log(`UPDATE grocery item: ${req.params.id}`);
  //sql statement: note, not using req.body.purchased here, another endpoint handles purchased
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
      const result = await pool.query(sqlText, [
        groceryItem.id,
        groceryItem.name,
        groceryItem.quantity,
        groceryItem.unit,
      ]);
      res.status(201).send(result.rows[0]);
    } catch (error) {
      console.error(`PUT Server Error`, error);
      res.status(500).send(error);
    }
  }
});

//DELETE ALL
router.delete('/all', async (req, res) => {
  console.log(`DELETE grocery items`);
  //sql statement
  const sqlText = `DELETE FROM "grocery";`;
  //use db pool
  try {
    await pool.query(sqlText);
    res.sendStatus(204);
  } catch (error) {
    console.error(`DELETE ALL Server Error`, error);
    res.status(500).send(error);
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
