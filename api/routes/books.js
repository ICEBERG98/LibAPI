const express = require('express');
const router = express.Router();
const bookModel = require('../models/book-model');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    bookModel.find()
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {

    const newBook = new bookModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        Author: req.body.author
    });
    newBook.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST request to /books",
                addedBook: newBook
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Handling POST request to /books",
                error: err
            });
        });
});

router.get('/:Id', (req, res, next) => {
    const id = req.params.Id;
    bookModel.findById(id)
        .exec().then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "Not found"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
});

router.patch('/:accNo', (req, res, next) => {
    const bookNo = req.params.accNo;
    res.status(200).json({
        message: 'Book details updated',
        bookId: bookNo
    });
});
router.delete('/:bookId', (req, res, next) => {
    id = req.params.bookId;
    bookModel.remove({
        _id: id
    })
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});
module.exports = router;