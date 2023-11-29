const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');


exports.orders_get_all = (req, res, next) =>{
    Order
    .find()
    .select('product quantity _id')
    .populate('product', 'name price')
    .exec()
    .then( (docs) =>{
        console.log('SAVE TO DB ORDER', docs);
        const reswponse = {
            count: docs.length,
            orders: docs
        }
        res.status(200).json(
            {message: 'Orders fetched', order:reswponse}
        );
    }).catch((err =>{
        res.status(500).json({error:err});
    }))
}

exports.orders_create_order = (req, res, next) =>{

    Product.findById(req.body.productId)
    .then((prod) => {

        if(!prod){
            return res.status(500).json(
            {message: 'Product not found'}
        )
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity:req.body.quantity,
            product: req.body.productId
        });
    
        return order.save();
    })
    .then( (result) =>{
        console.log('SAVE TO DB ORDER', result);
        res.status(201).json(
            {message: 'Order created', createdOrder:result}
        )
    })
    .catch((err) =>{
        console.log('SAVE TO DB ERR ORDER', err);
        res.status(500).json(
            {error: err}
        )
    })
    // .catch((err) =>{
    //     res.status(500).json(
    //         {message: 'Product not found'}
    //     )
    // })
    
}