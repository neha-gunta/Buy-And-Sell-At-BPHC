const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');
const product = require('../models/product');

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category doesn't exist",
      });
    }
    req.category = category;
    next();
  });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = (req, res) => {
  // console.log('req.body', req.body);
  // console.log('category update param', req.params.categoryId);
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Category deleted',
    });
  });
};

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.catStats=(req,res)=>{
    let abc=["lol"]
  
 Category.find({},(err,cats)=>{
   
     let abc=[]
    cats.map((x)=>{
      
      product.aggregate([
        {$match:{"category":(x._id)}},
        {$count:`${x.name}`}
      ],(err,data)=>{
        
        if(err) res.send(err)
        else {
          console.log(data[0])
          add(data[0])}
      })
          
    })
    const add=(data)=>{
      abc.push(data)
      console.log(abc)
      if(abc.length==cats.length) res.send(abc)
    }
    
      
  })

  
 
}