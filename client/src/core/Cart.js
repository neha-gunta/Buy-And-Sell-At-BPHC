import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
// import Checkout from './Checkout';

import Copyright from './Copyright';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your Wishlist has {`${items.length}`} items</h2>
        <hr />
        <div style={{width:"100%",display:"grid",gridTemplateColumns:"  auto auto auto"}}> 
        {items.map((product, i) => (
          <div style={{width:"400px"}}>
            <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          /></div>
        ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your wishlist is empty. <br /> <Link to='/shop'>Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title='WishList'
      description='View and manage the products in your wishlist'
      className='container-fluid'
    >
     
      
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        
    </Layout>
  );
};

export default Cart;
