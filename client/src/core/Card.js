import React, { useState,useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { API } from '../config';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CardM from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { read, sendMail } from './apiCore';

import { isAuthenticated } from '../auth';

import { addItem, updateItem, removeItem } from './cartHelpers';
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  
  productDescription: {
    height: '70px',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Card = ({
  product,
  showInterestedButton=true,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  
  const { user, token } = isAuthenticated();
 console.log(product)

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <div style={{marginBottom:"5px"}} >
        <Link href={`/product/${product._id}`} className='mr-3'>
          <Button variant='contained' color='info' fullWidth="true">
            View Product
          </Button>
        </Link></div>
      )
    );
  };

 


  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const Interested=(e)=>{
    e.preventDefault()
    const buyermail=user.email;
    const Buyername=user.name;
    console.log({
      buyermail,
      Buyername,
      productName:product.name,
      sellerID:product.PostOwner
    })
    Axios.post(`${API}/product/interested/${product._id}`,{
      buyermail,
      Buyername,
      productName:product.name,
      sellerID:product.PostOwner,
      BuyerID:user._id
    }).then((resp)=>{
      console.log(resp)
      if (resp.data=="success") alert("Seller has been notified!")
      else console.log(resp);
    }
    )
    const data={
      buyermail,
      Buyername,
      productName:product.name,
      sellerID:product.PostOwner
    }
    // const id=product._id
    // sendMail(data,id,token).then((resp)=>{
    //     console.log(resp)
    //     if (resp=="success") alert("Seller has been notified!")
    //     else console.log(resp);
    //   }
    //   )

  }
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button onClick={addToCart} variant='contained' color='secondary' startIcon={<FavoriteIcon />}>
        {/* <div style={{fontSize:"150%"}}>  &#9829;</div> */}
        WishList
        </Button>
      )
    );
  };
  const viewShowInterestedButton=(showInterestedButton)=>{
    return(
      <>
      {showInterestedButton && 
      <div style={{marginTop:"5px"}} >
        
          <Button variant='contained' color='primary' fullWidth="true"
          onClick={Interested}>
            Interested
          </Button>
        </div>
      }</>
    )
  }

 

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='mt-2'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Remove Product
        </Button>
      )
    );
  };

  const classes = useStyles();

  return (
    // <div className='card'>
    //   <div className='card-header name'>{product.name}</div>
    //   <div className='card-body'>
    //     {shouldRedirect(redirect)}
    //     <ShowImage item={product} url='product' />
    //     <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
    //     <p className='black-10'>${product.price}</p>
    //     <p className='black-9'>
    //       Category: {product.category && product.category.name}
    //     </p>
    //     <p className='black-8'>
    //       Added on {moment(product.createdAt).fromNow()}
    //     </p>

    //     {showStock(product.quantity)}
    //     <br></br>

    //     {showViewButton(showViewProductButton)}

    //     {showAddToCartBtn(showAddToCartButton)}

    //     {showRemoveButton(showRemoveProductButton)}

    //     {showCartUpdateOptions(cartUpdate)}
    //   </div>
    // </div>
   
    <Container className={classes.cardGrid} >
      <CssBaseline />
      <Grid container >
      <Grid item xs={12} sm={12} md={12}>
          <CardM className={classes.card}>
            {shouldRedirect(redirect)}
            <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='h4' component='h2'>
                {product.name}
              </Typography>
              <p  style={{fontSize:"15px",borderRadius:"10%"}}>
                Added  {moment(product.createdAt).fromNow()}{' '}
              </p>
            <ShowImage item={product} url='product' />
           
              
             
              <p className='black-10' style={{fontSize:"12px",margin:"2px",borderRadius:"10%"}}>
                Category: {product.category && product.category.name}{' '}
              </p>
              {
                !showViewProductButton &&
                 <span>
                <h5 style={{padding:"1px",margin:"1px"}} >Description:</h5>
                <p>{product.description}</p>
                </span>
              }
             
             
              <Typography variant="h6" color="text.secondary">
          Cost: Rs.{product.price}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Quantity: {product.quantity}{' '}
        </Typography>
              
              <br></br>
              <span>
                <span style={{display:"flex", flexDirection:"column",alignItems:"stretch"}}>
                {showViewButton(showViewProductButton)}
                
                {showAddToCartBtn(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}
                {viewShowInterestedButton(showInterestedButton)}
                </span>
              </span>
              {/* {showCartUpdateOptions(cartUpdate)} */}
            </CardContent>
          </CardM>
        </Grid>
      </Grid>
    </Container>
    
  );
};

export default Card;
