import React, { useState } from 'react'
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import {updatePost} from '../redux/postSlice';

function UpdatePost() {
    const {id}=useParams()
    const posts=useSelector(state=>state.posts.posts)
    const post=posts.data?.find(post=>post._id===id)
    const [editTitle,setEditTitle]=useState(post?.title)
    const [editPost,setEditPost]=useState(post?.post)
    const navigate=useNavigate()
    const dispatch=useDispatch()


    const handleUpdate=async(event)=>{
      event.preventDefault()
      try {
          await axios.put('http://localhost:8080/api/posts/update/'+id,{editTitle,editPost})
          dispatch(updatePost({id,title:editTitle,post:editPost}))
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
          <div className='justify-content-center'>
        <h1>Update Post</h1>
        <form onSubmit={handleUpdate}>
            <label>Title:</label>
            <input type="text" id="title" name="title" value={editTitle}  className='form-control-lg  p-1 m-2' onChange={(e)=>setEditTitle(e.target.value)}/><br/>
            <label>Post:</label>
            <textarea id="post" name="post" value={editPost} className='form-control-lg  p-1  mb-3' onChange={(e)=>setEditPost(e.target.value)}/><br/>
            <button className='btn btn-success me-3' onClick={(event)=>{
              handleUpdate(event),
              navigate("/posts")
            }}>Update post</button>
            <button className='btn btn-dark' onClick={()=>navigate("/posts")}>Go Back</button>
        </form>

    </div>
    </div>
  )
}

export default UpdatePost