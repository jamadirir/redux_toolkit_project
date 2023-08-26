import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import {getPosts,deletePost} from '../redux/postSlice';

function PostList() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const posts=useSelector(state=>state.posts.posts)

    useEffect(()=>{
        const getData=async()=>{
          try {
           const response=await axios.get('http://localhost:8080/api/posts/show')
           dispatch(getPosts(response.data))
          } catch (error) {
            console.log(error)
          }
        }
        getData()
       },[])


    const handleDelete=async(id)=>{
        try {
          await axios.delete('http://localhost:8080/api/posts/delete/'+id)
          dispatch(deletePost(id))
        } catch (error) {
          console.log(error)
        }
       }

       

  return (
<div>
 <button className='btn btn-secondary float-start p-3 m-3' onClick={()=>navigate("/")}>Create New Post</button>
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
      handleDelete(post._id),
      navigate("/")
     }}>Delete</button>
     <Link className='btn btn-secondary me-2' to={"/edit/"+post._id}>Edit</Link><br/>
   </tr>
   )):'No posts here!'}
  </tbody>
</table>
    </div>
  )
}

export default PostList