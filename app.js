const express=require('express');
const app = express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const bookRoutes= require('./api/routes/books');
const issueRoutes=require('./api/routes/issues');

mongoose.connect('mongodb://', +process.env.MONGO_ATLAS_UNAME, ':', +process.env.MONGO_ATLAS_PWD, '@libraryapi-shard-00-00-krtfz.mongodb.net:27017,libraryapi-shard-00-01-krtfz.mongodb.net:27017,libraryapi-shard-00-02-krtfz.mongodb.net:27017/test?ssl=true&replicaSet=LibraryAPI-shard-0&authSource=admin&retryWrites=true');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  })

app.use('/books', bookRoutes);
app.use('/issues',issueRoutes);

app.use((req, res, next) =>{
    const error= new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});
module.exports = app;
