import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function ShoppingForm({ fetchGrocery }) {
  const defaultState = { name: '', quantity: '0', unit: '' };
  const [groceryItem, setGroceryItem] = useState(defaultState);

  const handleInput = (event) => {
    setGroceryItem((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/grocery', groceryItem);
      setGroceryItem(defaultState);
      fetchGrocery();
    } catch (error) {
      console.error('Error posting grocery item...');
    }
  };
  return (
    <section>
      <form onSubmit={(event) => submitForm(event)}>
        <label htmlFor='input-name-id'>Name</label>
        <input
          id='input-name-id'
          name='name'
          type='text'
          value={groceryItem.name}
          placeholder='Name'
          onChange={(event) => handleInput(event)}
          required
        />
        <label htmlFor='input-quantity-id'>Quantity</label>
        <input
          id='input-quantity-id'
          name='quantity'
          type='number'
          value={groceryItem.quantity}
          placeholder='Quantity'
          onChange={(event) => handleInput(event)}
          required
        />
        <label htmlFor='input-unit-id'>Unit</label>
        <input
          id='input-unit-id'
          name='unit'
          type='text'
          value={groceryItem.unit}
          placeholder='Unit'
          onChange={(event) => handleInput(event)}
          required
        />
        <button type='submit'>Add</button>
      </form>
    </section>
  );
}

export default ShoppingForm;
