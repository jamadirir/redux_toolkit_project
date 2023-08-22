import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch,useSelector } from 'react-redux';
import {getPosts,addPost,deletePost, updatePost} from './redux/postSlice';
import {setLoading} from './redux/loaderSlice'
import axios from 'axios'
function Posts() {
 const [title,setTitle]=useState('');
 const [post,setPost]=useState('');
 const [editTitle,setEditTitle]=useState(null);
 const [editPost,setEditPost]=useState(null);
 const [isEdit,setIsEdit]=useState(false);
 const [id,setId]=useState(null)

 
 const dispatch=useDispatch()
 const loading=useSelector(state=>state.loaders)
 console.log("loader:",loading)
 const posts=useSelector(state=>state.posts.posts)
 console.log("POS:",posts)

   useEffect(()=>{
    const getData=async(res,req)=>{
      try {
       const response=await axios.get('http://localhost:8080/api/posts/show')
       console.log("RESPO :",response)
       dispatch(getPosts(response.data))
       res.send({
         success:true,
         response
       })
      } catch (error) {
       
        res.send({
         success:false,
         message:error.message
        })
      }
    }
    getData()
   },[])

   const handleSubmit=async(event,res)=>{
    event.preventDefault()
    try {
      const response=await axios.post('http://localhost:8080/api/posts/create',{title,post})
        dispatch(addPost(response.data))
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

   const handleDelete=async(id)=>{
    try {
      await axios.delete('http://localhost:8080/api/posts/delete/'+id)
      dispatch(deletePost(console.log("Del:",id)))
    } catch (error) {
      res.send({
        success:false,
        message:error.message
      })

    }
   }

  const handleUpddate=async(id)=>{
    try {
      const res=await axios.put('http://localhost:8080/api/posts/update/'+id,{editTitle,editPost})
      if(res){
        dispatch(console.log("UPDATE:",{id,title:editTitle,post:editPost}))
      }
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
            <button type='button' className='btn btn-primary'  onClick={handleSubmit}>Save</button>
        </form>
        <table className="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Post</th>
      <th>CreateAt</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
   {posts.data?.length > 0 ? posts.data?.map(post=>(
     <tr key={post._id}>
     <td>{post._id}</td> 
     <td>{post.title}</td>
     <td>{post.post}</td>
     <td>{post.createdAt}</td>
     <button className='btn btn-danger me-2' onClick={()=>{
      handleDelete(post._id)
     }}>Delete</button>
     <button className='btn btn-secondary me-2' onClick={()=>{
      setIsEdit(true),
      setId(post._id)
      setEditTitle(post.title)
      setEditPost(post.post)
     }}>Edit</button><br/>
    
   {isEdit && post._id == id && (
    <>
    <label>Title:</label>
    <input type="text" id="title"  name="title" value={editTitle}  className='form-control-lg  p-1 m-2' onChange={(e)=>setEditTitle(e.target.value)}/><br/>
    <label>Post:</label>
    <textarea id="post" name="post" value={editPost}  className='form-control-lg  p-1 m-2 me-2' onChange={(e)=>setEditPost(e.target.value)}/>
    <button className='btn btn-success' onClick={()=>{
      handleUpddate(post._id)
      setIsEdit(false)
    }}>Update post</button>
    </>
    )}
   </tr>
   )):'No posts here!'}
  </tbody>
</table>
    </div>
  )
}



export default Posts