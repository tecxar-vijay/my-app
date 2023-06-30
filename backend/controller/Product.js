const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body); // it will take the product from the req.body
  try {
    const doc = await product.save(); // it will save the product in database
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllProducts = async (req, res) => {
  // here we will need for querystring as we have made it on frontend while making api

  // here we are putting the condition that if the person(appuser) is admin only then it will show the deleted products in products list
  let condition = {}
  if (!req.query.admin) {
    condition.deleted = {$ne : true}
  }
  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition); // here we cannot use the same query for products and getting total number of products so that is why we will have to make another query to count the number of products

  // here in if condition it will check that inside req.query is there the category and if it is there than it will fond it by find method
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }

  if (req.query.brand) {
    // for brand
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: [req.query._order] });
  }

  const totaldocs = await totalProductsQuery.count().exec(); // it will count the number of products
  console.log({ totaldocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    // skip method will skip the products as per pagesize and page-1 formula so our pagination will work
    query = query.skip(pageSize * (page - 1)).limit(pageSize); // here limit method will return the number of products defined inside of it
  }

  try {
    const docs = await query.exec(); // it will execute the query
    res.set("X-Total-Count", totaldocs); // it will set the header in number of totle docs
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

// exports.fetchAllProducts = async (req, res) => {
//   // filter = {"category":["smartphone","laptops"]}
//   // sort = {_sort:"price",_order="desc"}
//   // pagination = {_page:1,_limit=10}
//   let condition = {}
//   if(!req.query.admin){
//       condition.deleted = {$ne:true}
//   }
  
//   let query = Product.find(condition);
//   let totalProductsQuery = Product.find(condition);

//   console.log(req.query.category);

//   if (req.query.category) {
//     query = query.find({ category: {$in:req.query.category.split(',')} });
//     totalProductsQuery = totalProductsQuery.find({
//       category: {$in:req.query.category.split(',')},
//     });
//   }
//   if (req.query.brand) {
//     query = query.find({ brand: {$in:req.query.brand.split(',')} });
//     totalProductsQuery = totalProductsQuery.find({ brand: {$in:req.query.brand.split(',') }});
//   }
//   if (req.query._sort && req.query._order) {
//     query = query.sort({ [req.query._sort]: req.query._order });
//   }

//   const totalDocs = await totalProductsQuery.count().exec();
//   console.log({ totalDocs });

//   if (req.query._page && req.query._limit) {
//     const pageSize = req.query._limit;
//     const page = req.query._page;
//     query = query.skip(pageSize * (page - 1)).limit(pageSize);
//   }

//   try {
//     const docs = await query.exec();
//     res.set('X-Total-Count', totalDocs);
//     res.status(200).json(docs);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};
