import React from 'react';
import ShoppingItem from './ShoppingItem';
import axios from 'axios';

function ShoppingList({ groceryList, fetchGrocery }) {
  const handlePurchaseReset = async (event) => {
    event.preventDefault();
    try {
      await axios.put('/api/grocery/purchase/reset');
      fetchGrocery();
    } catch (error) {
      console.error('Error Purchase Reset');
    }
  };

  const handleDeleteAll = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`/api/grocery/all`);
      fetchGrocery();
    } catch (error) {
      console.error('Error Deleting All Grocery items');
    }
  };
  return (
    <section>
      <button onClick={(event) => handlePurchaseReset(event)}>Reset</button>
      <button onClick={(event) => handleDeleteAll(event)}>Clear</button>

      {groceryList?.map((item) => (
        <ShoppingItem key={item.id} item={item} fetchGrocery={fetchGrocery} />
      ))}
    </section>
  );
}

export default ShoppingList;
