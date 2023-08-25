import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from './page/CreatePost';
import PostList from './page/PostList';
import UpdatePost from './page/UpdatePost';

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<CreatePost/>} />
        <Route path="/posts" element={<PostList/>} />
        <Route path="/edit/:id" element={<UpdatePost/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
