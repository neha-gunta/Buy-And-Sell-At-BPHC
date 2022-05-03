import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();
console.log(user)
const loadProducts = () => {
  getProducts().then((data) => {
    if (data.error) {
      console.log(data.error);
      
    } else {
      if(user.role==0){
        data=data.filter((p)=> p.PostOwner==user._id)
        
      }        
      setProducts(data);
      
    }
  });
};

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    (  () => {
      getProducts().then((data) => {
        if (data.error) {
          console.log(data.error);
          
        } else {
          if(user.role==0){
            data=data.filter((p)=> p.PostOwner==user._id)
            
          }        
          setProducts(data);
          
        }
      });
    })()
   
  }, []);

  return (
    <Layout
      title='Manage Products'
      description='Perform CRUD on products'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>Total {products.length} products</h2>
          <hr />
          <ul className='list-group'>
            {products.map((p, i) => (
              <li
              style={{paddingLeft:"250px",paddingRight:"150px"}}
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <a href={`/product/${p.id}`} ><h4 style={{color:"black"}}>{p.name}</h4></a> 
                <span style={{padding:"10px"}}>
                {user.role==1 &&
                <Link to={`/admin/product/update/${p._id}`}>
                  
                  <span style={{backgroundColor:"black",color:"white",padding:"5px",margin:"10px",borderRadius:"5px"}}>Update</span>
                </Link>
                }
                  <span
                    onClick={() => destroy(p._id)}
                    style={{backgroundColor:"red",color:"black",fontWeight:"700",padding:"5px",borderRadius:"5px"}}
                  >
                    Delete
                  </span></span>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
