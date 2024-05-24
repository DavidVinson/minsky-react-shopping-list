import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import './App.css';
import axios from 'axios';
import ShoppingForm from '../Shopping/ShoppingForm.jsx';
import ShoppingList from '../Shopping/ShoppingList.jsx';

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const [editItem, setEditItem] = useState(undefined);

  //first load grocery data
  useEffect(() => {
    console.log('loading groceries...');
    fetchGrocery();
  }, []);

  //fetch groceries
  const fetchGrocery = async () => {
    try {
      const response = await axios.get('/api/grocery');
      setGroceryList(response.data);
    } catch (error) {
      console.error('Error fetching groceries...');
    }
  };

  const handleEdit = (itemId) => {
    console.log('Edit this item with local state', itemId);
    if (itemId) {
      const foundItem = groceryList.find((item) => Number(item.id) === Number(itemId));
      console.log('found item', foundItem);
      // {id: '23', name: 'apples', quantity: '2', unit: 'ea'}
      setEditItem(foundItem);
    }
  };

  return (
    <div className='App'>
      <Header />
      <main>
        <ShoppingForm fetchGrocery={fetchGrocery} editItem={editItem} setEditItem={setEditItem} />
        <ShoppingList groceryList={groceryList} fetchGrocery={fetchGrocery} handleEdit={handleEdit} />
      </main>
    </div>
  );
}

export default App;
