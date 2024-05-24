import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import './App.css';
import axios from 'axios';
import ShoppingForm from '../Shopping/ShoppingForm.jsx';
import ShoppingList from '../Shopping/ShoppingList.jsx';

function App() {
  const [groceryList, setGroceryList] = useState([]);

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

  return (
    <div className='App'>
      <Header />
      <main>
        <ShoppingForm fetchGrocery={fetchGrocery} />
        <ShoppingList groceryList={groceryList} fetchGrocery={fetchGrocery} />
      </main>
    </div>
  );
}

export default App;
