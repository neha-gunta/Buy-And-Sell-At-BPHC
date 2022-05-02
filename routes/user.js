const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const {
  userById,
  read,
  update,
  purchaseHistory,
  sample,
  sample1,
  getInterested,
  getAllUsers,
  deleteUser
} = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.delete("/user/delete/:id",deleteUser)
router.get("/users",getAllUsers)
router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

router.param('userId', userById);
router.get("/sample/:x",sample,sample1,(req,res)=>{
console.log(req.abc)
})
router.get("/user/interested/:userID",getInterested)
module.exports = router;
