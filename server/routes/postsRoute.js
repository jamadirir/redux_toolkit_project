const express=require('express')
const {Create,Show,Delete,Update}=require('../controllers/postsController');

const router=express.Router()

router.get('/show',Show)
router.post('/create',Create)
router.put('/update/:id',Update)
router.delete('/delete/:id',Delete)


module.exports=router