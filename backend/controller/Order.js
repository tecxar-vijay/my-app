
const { Order } = require("../model/Order");

exports.fetchOrderByUser = async (req, res) => {
    const {userId} = req.params; 
   try {
    const orders = await Order.find({user : userId})
    res.status(200).json(orders)
   } catch (error) {
    res.status(400).json(error)
   }
  };

  exports.createOrder = async (req,res) => {
    const order = new Order(req.body)
    try {
        const doc = await order.save()
        res.status(200).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
  }

  exports.deleteOrder = async (req,res) => {
    const {id} = req.params
    try {
        const doc = await Order.findByIdAndDelete(id)
        res.status(200).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
  }

  exports.updateOrder = async (req,res) => {
    const {id } = req.params
    try {
        const order = await Order.findByIdAndUpdate(id,req.body ,{new : true})
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
  }

  
  exports.fetchAllOrders = async (req, res) => {
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    let query = Order.find({deleted:{$ne:true}});
    let totalOrdersQuery = Order.find({deleted:{$ne:true}});
  
    
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    const totalDocs = await totalOrdersQuery.count().exec();
    console.log({ totalDocs });
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
  };

//   exports.fetchAllOrders = async (req, res) => {
//     // here we will need for querystring as we have made it on frontend while making api
  
//     let query = Order.find({deleted : {$ne : true}});
//     let totalOrderQuery = Order.find({deleted : {$ne : true}}); // here we cannot use the same query for products and getting total number of products so that is why we will have to make another query to count the number of products
  
//     if (req.query._sort && req.query._order) {
//       query = query.sort({ [req.query._sort]: [req.query._order] });
//     }
  
//     const totaldocs = await totalOrderQuery.count().exec(); // it will count the number of products
//     console.log({ totaldocs });
  
//     if (req.query._page && req.query._limit) {
//       const pageSize = req.query._limit;
//       const page = req.query._page;
//       // skip method will skip the products as per pagesize and page-1 formula so our pagination will work
//       query = query.skip(pageSize * (page - 1)).limit(pageSize); // here limit method will return the number of products defined inside of it
//     }
  
//     try {
//       const docs = await query.exec(); // it will execute the query
//       res.set("X-Total-Count", totaldocs); // it will set the header in number of totle docs
//       res.status(200).json(docs);
//     } catch (error) {
//       res.status(400).json(error);
//       console.log(error);
//     }
//   };
  