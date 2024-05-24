import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ShoppingItem({ item, fetchGrocery, handleEdit }) {
  // toggle purchase via db call
  const handlePurchase = async (event, itemId) => {
    event.preventDefault();
    try {
      await axios.put(`/api/grocery/purchase/${itemId}`);
      fetchGrocery();
    } catch (error) {
      console.error('Error Purchase Grocery item');
    }
  };

  const handleDelete = async (event, itemId) => {
    event.preventDefault();
    try {
      await axios.delete(`/api/grocery/${itemId}`);
      fetchGrocery();
    } catch (error) {
      console.error('Error Deleting Grocery item');
    }
  };

  return (
    <Card style={{ width: '18rem', border: '1px solid black' }}>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.quantity} {item.unit}
        </Card.Text>
        <Button className='mx-1' variant='primary' size='sm' onClick={(event) => handlePurchase(event, item.id)}>
          {item.purchased ? 'Remove' : 'Purchase'}
        </Button>
        <Button className='mx-1' variant='primary' size='sm' onClick={() => handleEdit(item.id)}>
          Edit
        </Button>
        <Button className='mx-1' variant='primary' size='sm' onClick={(event) => handleDelete(event, item.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ShoppingItem;
