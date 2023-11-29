const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderController = require('../contollers/order');


router.get('/', checkAuth, orderController.orders_get_all);

router.post('/', checkAuth, orderController.orders_create_order);

router.get('/:orderId', checkAuth, (req, res, next) =>{

    const id = req.params.orderId;
    Order.findById(id)
    .select('product quantity _id')
    .populate('product', 'name price')
    .exec()
    .then( (order) =>{
        console.log('FROM DB', id, order);
        if(!order){
            return res.status(404).json(
            {message: 'Order not found'}
        )
        }
        res.status(200).json(
            {message: 'Order details', order: order}
        )
    })
    .catch((err) =>{
        console.log('SAVE TO DB ERR', err);
        res.status(500).json({error:err})
    });

    
});

router.delete('/:orderId', checkAuth, (req, res, next) =>{
    const id = req.params.orderId;
    Order.deleteOne({ _id:id})
    .exec()
    .then((result) => {
        res.status(201).json(
            {message: 'Order Deleted', orderId:id}
        )
    }).catch((err) => {
        res.status(500).json({error:err});
    })

    
});

    module.exports = router;