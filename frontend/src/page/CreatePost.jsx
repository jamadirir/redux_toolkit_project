import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {addPost} from '../redux/postSlice';

function CreatePost() {
 const [title,setTitle]=useState('');
 const [post,setPost]=useState(''); 
 const dispatch=useDispatch()
  const navigate=useNavigate()

   const handleSubmit=async(event)=>{
    event.preventDefault()
    try {
      const response=await axios.post('http://localhost:8080/api/posts/create',{title,post})
      dispatch(addPost(console.log("Register:",response.data)))
         
        res.send({
          success:true,
          data:response,
          message:'post created'
        })
       
    } catch (error) {
      res.send({
        success:false,
        message:error.message
      })
    }
   }


  return (
    <div className='justify-content-center'>
        <h1>Add a post</h1>
        <form onSubmit={handleSubmit}>
           <div className='form-group'>
           <label htmlFor="title">Title </label>
           <input type="text" id="title" name="title" value={title} className='form-control-lg mb-2 p-2'  onChange={(e)=>setTitle(e.target.value)}/>
           </div>
           <div className='form-group'>
           <label htmlFor="title">Post </label>
           <textarea id="post" placeholder='please write your post here' name="post" value={post} className='form-control-lg pt-1  mb-2'  onChange={(e)=>setPost(e.target.value)}/>
           </div>
            <button type='button' className='btn btn-success me-lg-2 p-3'  onClick={(event)=>{
              handleSubmit(event),
              setTitle("")
              setPost("")
              navigate("/posts")
              }}>Save</button>
              <button type='button' className='btn btn-danger p-3'  onClick={()=>{
              navigate("/posts")
              }}>Go Back</button>
        </form>

    </div>
  )
}



export default CreatePost