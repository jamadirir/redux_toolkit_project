const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    post:{
        type:String
    }
},{ timestamps: true }) 

const postsModel= mongoose.model('posts',postSchema);

module.exports=postsModel