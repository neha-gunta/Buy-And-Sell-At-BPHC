const express = require('express');
const router = express.Router();

const {
  create,
  productById,
  read,
  update,
  remove,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch
} = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { sendMail } = require('../controllers/nodemailer');


router.get('/product/:productId', read);
router.post("/product/interested/:productId",sendMail)
router.post('/product/create/:userId', requireSignin, isAuth, create);
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  
  remove
);

router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  
  update
);

router.get('/products', list);
router.get('/products/search', listSearch);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);

// router.post("/product/:productId",sendMail)

module.exports = router;
