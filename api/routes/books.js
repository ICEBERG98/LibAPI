const express=require('express');
const router=express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: "Handling GET request to /books"
    });    
});

router.post('/', (req, res, next) =>{
    const newbook={
        name: req.body.name,
        bId: req.body.bookId
    }
    res.status(201).json({
        message: "Handling POST request to /books",
        addedBook: newbook
    });    
});

router.get('/:accNo',(req, res, next)=>{
    const bookNo=req.params.accNo;
    if(bookNo === 'special'){
        res.status(200).json({
            message : "special book" 
        });
    }
    else{
        res.status(200).json({
            message : "book no",
            bookId : bookNo
        });
    }
});
router.post('/:accNo',(req, res, next)=>{
    
    res.status(201).json({
        message: 'book added to library',
        bookId: req.params.accNo
    });
});

router.patch('/:accNo',(req, res, next)=>{
    const bookNo=req.params.accNo;
   res.status(200).json({
       message :'Book details updated',
       bookId: bookNo
   });
});
router.delete('/:accNo',(req, res, next)=>{
    const bookNo=req.params.accNo;
   res.status(200).json({
       message :'Book decommisioned',
       bookId: bookNo
   });
});
module.exports = router;