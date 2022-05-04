import { Container, Typography ,Button} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import { read } from '../user/apiUser'
import { addItem } from './cartHelpers'
import Layout from './Layout'

export default function PostItemPage(props) {
  const [product, setProduct] = useState({});
  
  const [error, setError] = useState(false);

    const loadSingleProduct = (productId) => {
      read(productId).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProduct(data);
          // fetch related products
          
        }
      });
    };

    useEffect(() => {
    const productId = props.match.params.productId;
    console.log(productId)
    loadSingleProduct(productId);
  }, [props]);
    
    
    const addToCart = () => {
      // console.log('added');
      
      addItem(product,()=> console.log("added"));
      alert("Item Added!")
    };

  return (
    
       <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className='container-fluid'
    >
      <Container sx={{padding:"15px"}}>
          
          <br /><br/>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"left"}}>
          <img style={{padding:"30px",maxHeight:"50%",maxWidth:"50%",border:"2px solid black",borderRadius:"15px"}} src={product.selectedFile} ></img>
          <div style={{padding:"50px"}} >
          <Typography variant='h3' align="center" >{product.name}</Typography>
              <br />
              <h3>{`Description : ${product.description}`}</h3>
              <h2>{`Cost : Rs. ${product.price} /-`}</h2>
              <h2></h2>//contact details
         <div><br/>
              <Button variant="contained">Interested!</Button><br/><br/>
              <Button onClick={addToCart} variant='contained' color='secondary' startIcon={<FavoriteIcon />}>
        {/* <div style={{fontSize:"150%"}}>  &#9829;</div> */}
        WishList
        </Button>
        </div>
        </div>
        
          
          </div>
          </Container>
    
    </Layout>
  )
}
