const mongoose=require("mongoose")


mongoose.connect('mongodb://127.0.0.1:27017/Portfolio');
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=mongoose.model("Collection1",LogInSchema)

module.exports=collection;
