const express=require('express')
const cors=require('cors')
require('dotenv').config()
require('./config/database')
const routes=require('./routes/postsRoute.js')
const app=express();
app.use(express.json());
app.use(cors())
app.use('/api/posts/',routes)

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})