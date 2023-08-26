import { createSlice } from '@reduxjs/toolkit'


export const postSlice = createSlice({
  name: 'posts',
  initialState:{
    posts:[]
  },
  reducers: {
    getPosts:(state,action)=>{
      state.posts=action.payload;
    },

    addPost:(state,action)=>{
        state.posts.push(action.payload)
    },

    deletePost:(state,action)=>{
      state.posts=state.posts.filter(post => post._id != action.payload)
    }, 
    
    updatePost:(state,action)=>{
      state.posts.map(post=>{
        if(post._id===action.payload.id){
          post.title=action.payload.title,
          post.post=action.payload.post
        }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { getPosts,addPost,deletePost, updatePost} = postSlice.actions

export default postSlice.reducer