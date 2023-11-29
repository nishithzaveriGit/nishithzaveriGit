const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) =>{

    User
    .find({email:req.body.email})
    .exec()
    .then( (user) =>{
        if(user && user.length >= 1) {
            res.status(409).json({
                message: 'email exist'
            })
        } else{
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if(err){
                    res.status(500).json(
                        {error: err}
                    )
                } else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password: hash
                    });
        
                    user
                    .save()
                    .then( (result) =>{
                        console.log('USEAR SAVE TO DB', result);
                        res.status(201).json(
                            {message: 'User created'}
                        )
                    })
                    .catch((err) =>{
                        console.log('USEAR ERR', err);
                        res.status(500).json(
                            {error: err}
                        )
                    })
                }
            })
        }
        
    })
    
});

router.post('/login', (req, res, next) =>{
    User
    .find({email:req.body.email})
    .exec()
    .then( (user) =>{
        if(user && user.length < 1){
            res.status(401).json({
                message: 'Auth failed'
            });
        }
        console.log('LOGIN PWD', user);
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err || !result){
                res.status(401).json({
                    message: 'Auth failed'
                });
            }
            console.log('LOGIN result', result, req.body.password, user[0].password);
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId:user[0]._id
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                },
                )
                res.status(200).json({
                    message: 'Auth successfull',
                    token:token
                });
            } else{
                res.status(200).json({
                    message: 'Email or Password not valid',
                });
            }
        })
    }).catch((err) => {
        console.log('LOGIN CATCH ERR');
        res.status(500).json({error:err});
    })
});

router.delete('/:userId', (req, res, next) =>{
    const id = req.params.userId;
    User.deleteOne({ _id:id})
    .exec()
    .then((result) => {
        res.status(200).json({
            message: 'User deleted'
        });
    }).catch((err) => {
        res.status(500).json({error:err});
    })
});

module.exports = router;