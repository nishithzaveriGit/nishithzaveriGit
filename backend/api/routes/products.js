const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const mongoose = require('mongoose');
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');

const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination: (req, file,cb) => {
        console.log('DESTINATION', cb, __dirname, process.cwd());
cb(null,'uploads/')
    },
    filename: (req, file,cb) => {
        console.log('FILENAME', file.originalname);
        // cb(null, new Date().toISOString() + file.originalname)
        // cb(null, Date.now() + file.originalname)
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})
// limits: {
//     fileSize: 1000000 // max file size 1MB = 1000000 bytes
//   },
  const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }

const upload = multer({storage: multerStorage, limits : {fileSize : 1024 * 1024 * 5}, fileFilter: fileFilter})
// const upload = multer({dest: 'uploads/'});


router.get('/', (req, res, next) =>{
    Product
    .find()
    .select('name price _id productImage')
    .exec()
    .then( (docs) =>{
        console.log('SAVE TO DB', docs);
        const reswponse = {
            count: docs.length,
            products: docs
        }
        res.status(200).json(reswponse)
    }).catch((err =>{
        res.status(500).json({error:err});
    }))
    
});

// without image upload
router.post('/', checkAuth, upload.single('productImage'), (req, res, next) =>{
    console.log('Image FIle', req.file);
        const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price: req.body.price,
        productImage:req.file.path
    });

    product
    .save()
    .then( (result) =>{
        console.log('SAVE TO DB', result);
        res.status(201).json(
            {message: 'Handling PODT request for products', createdProduct: result}
        )
    })
    .catch((err) =>{
        console.log('SAVE TO DB ERR', err);
        res.status(500).json(
            {error: err}
        )
    })

});

router.get('/:productId', checkAuth, (req, res, next) =>{

    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then( (doc) =>{
        console.log('FROM DB', id, doc);
            res.status(200).json(doc);
    })
    .catch((err) =>{
        console.log('SAVE TO DB ERR', err);
        res.status(500).json({error:err})
    });

    // if(id === 'special'){
    //     res.status(200).json(
    //         {message: 'You discover an ID', id:id}
    //     )
    // } else {
    //     res.status(200).json(
    //         {message: 'You passed ID'}
    //     )
    // }
    
});

router.patch('/:productId', checkAuth, (req, res, next) =>{

    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id:id}, {$set:updateOps})
    .exec()
    .then((result) => {
        res.status(200).json({message: 'Product updated!', result});
    }).catch((err) => {
        res.status(500).json({error:err});
    })
    // res.status(200).json(
    //     {message: 'Updated Product!'}
    // )
    
});

router.delete('/:productId', checkAuth, (req, res, next) =>{

    const id = req.params.productId;
    Product.deleteOne({ _id:id})
    .exec()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json({error:err});
    })
    
    
});

module.exports = router;