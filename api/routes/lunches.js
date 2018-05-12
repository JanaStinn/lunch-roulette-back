const express = require('express');
const router = express.Router();
const Lunch = require('../models/lunch');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  Lunch.find()
    .exec()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json({error: err}))
})

router.post('/', (req, res, next) => {
  const lunch = new Lunch({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    date: req.body.date,
    participants: req.body.participants
  })
  lunch
    .save()
    .then(result => res.status(201).json({
      message: 'Post request handled',
      createdLunch: result
    }))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/:lunchID', (req, res, next) => {
  const id = req.params.lunchID;
  Lunch.findById(id)
    .exec()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json({error: err}))
})

router.patch('/:lunchID', (req, res, next) => {
  const id = req.params.lunchID;
  const updateLunch = {};
  for (const lunch of req.body) {
    updateLunch[lunch.propName] = lunch.value
  }
  Lunch.update({_id: id}, {$set: updateLunch})
    .exec()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json({error: err}))
})

router.delete('/:lunchID', (req, res, next) => {
  const id = req.params.lunchID;
  Lunch.remove({_id: id})
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;