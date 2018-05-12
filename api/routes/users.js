const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  User.find()
    .exec()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json({error: err}))
})

router.post('/', (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    password: req.body.password
  })
  user
    .save()
    .then(result => res.status(201).json({
      message: 'Post request handled',
      createdUser: result
    }))
    .catch(err => res.status(500).json({error: err}))
  res.status(201).json({
    message: user
  })
})

router.get('/:userID', (req, res, next) => {
  const id = req.params.userID;
  User.findById(id)
    .exec()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;