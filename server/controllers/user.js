const User = require('../models/user');
const { Order } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  // console.log('user update', req.body);
  // req.body.role = 0; // role will always be 0
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'You are not authorized to perform this action',
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

// exports.update = (req, res) => {
//   // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
//   const { name, password } = req.body;

//   User.findOne({ _id: req.profile._id }, (err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: 'User not found',
//       });
//     }
//     if (!name) {
//       return res.status(400).json({
//         error: 'Name is required',
//       });
//     } else {
//       user.name = name;
//     }

//     if (password) {
//       if (password.length < 6) {
//         return res.status(400).json({
//           error: 'Password should be min 6 characters long',
//         });
//       } else {
//         user.password = password;
//       }
//     }

//     user.save((err, updatedUser) => {
//       if (err) {
//         console.log('USER UPDATE ERROR', err);
//         return res.status(400).json({
//           error: 'User update failed',
//         });
//       }
//       updatedUser.hashed_password = undefined;
//       updatedUser.salt = undefined;
//       res.json(updatedUser);
//     });
//   });
// };

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error: 'Could not update user purchase history',
        });
      }
      next();
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('user', '_id name')
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};

exports.sample=(req,res,next)=>{
  console.log(req);
  req.abc="abcd"
  next()
}
exports.sample1=(req,res,next)=>{
  console.log(req.abc);
  next()
}

exports.getInterested=(req,res)=>{
  const userId=req.params.userID;
  User.findById(userId,(err,resp)=>{

    if(err) console.log(err)
    else{
      res.send(resp.interested)
      // console.log(resp.interested)
    }
    
  })
}

exports.getAllUsers=(req,res)=>{
  User.find({},(err,resp)=>{
    if(err) console.log(err)
    else{
      res.send(resp)
      // console.log(resp)
    }
  })
}
exports.deleteUser=(req,res)=>{
  User.findByIdAndDelete(req.params.id,(err,resp)=>{
    if(err) console.log(err)
    else{
      res.status(200).send("deleted")
      // console.log(resp)
    }
  })
}