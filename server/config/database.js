const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_URI);

const connection=mongoose.connection;

connection.on('connected',()=>{
    console.log(`Mongo db connected successfully`)
})


connection.on('error',(err)=>{
    console.log(`Mongo db not connected`,err)
})

module.exports=mongoose