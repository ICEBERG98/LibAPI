const express=require('express');
const router=express.Router();

router.get('/', (req, res, next)=> {
    res.status(200).json({
        message: "issues were fetched"
    });
});
router.post('/', (req, res, next)=> {
    const newIssue={
        issuer: req.body.issuerId,
        book: req.body.bookId
    }
    res.status(201).json({
        message: "issue was created",
        details: newIssue
    });
});
router.delete('/', (req, res, next)=> {
    res.status(201).json({
        message: "issue was deleted"
    });
});
router.get('/:issueNo', (req, res, next)=> {
    const issId=req.params.issueNo;
    res.status(200).json({
        message: "issues were fetched",
        issueNo : issId
    });
});

router.delete('/:issueNo', (req, res, next)=> {
    const issId=req.params.issueNo;
    res.status(200).json({
        message: "issues were deleted",
        issueNo : issId
    });
});
module.exports = router;