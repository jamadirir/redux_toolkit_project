const express=require('express')
const postsModel = require('../model/postsModel.js');

exports.Create = async (req, res) => {
    try {
        const newPost=postsModel(req.body);
        await newPost.save();
        res.send({
            success:true,
            data:newPost,
            mesaage:`post created successfully`
        })
    } catch (err) {
        res.send({
            success:false,
            message:err.message
        })

    }
  };
  
exports.Show= async (req, res) => {
    try {
        const posts=await postsModel.find({})
        if(!posts){
            throw new Error(`Posts not found!`)
        }
        res.send({
            success:true,
            data:posts
        })
        } catch (err) {
            res.send({
                success:false,
                message:err.message
            })
        }
  };
  
 exports.Update= async(req,res)=>{
    const id=req.params.id;
    try {
        const response=await postsModel.findByIdAndUpdate({_id:id},{
            title:req.body.editTitle,
            post:req.body.editPost,
        })

        console.log("RESPP:",response)
        res.send({
            success:true,
            data:response,
            message:"post updated"
        })
    } catch (err) {
        res.send({
            success:false,
            message:err.message
        })
    }
  }
  
  
exports.Delete=async(req,res)=>{
    const id=req.params.id;
    try {
        const response=await postsModel.findByIdAndDelete({_id:id})
        if(!response){
            throw new Error(`No! post found`)
        }
        res.send({
            success:true,
            data:response,
            message:"post deleted"
        })
    } catch (err) {
        res.send({
            success:false,
            message:err.message
        })
    }
  }