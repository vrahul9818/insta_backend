const express = require("express");
const cors    = require("cors");
const fileupload = require("express-fileupload");
const insta_post = require('./models/user')
const mongoose = require('mongoose');
const path = require("path");


const port = 8081||process.env.port; 

const uri = `mongodb+srv://rahul:rahul@cluster0.hdglsf9.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri,(err)=>{
    if(err){
        console.log("error")
    }
    else{
        console.log("sucessful")
    }
})
const app = express();
app.use(cors())
app.use(express.json());
app.use(fileupload())
app.get("/",(req,res)=>{res.send("ok")})
app.post("/uploads",async(req,res)=>{
    
    const {imagefile} = req.files;
    const {name ,address,description,likes,date} = req.body;
    console.log(req.body)
    imagefile.mv("./imageUpload/"+imagefile.name,(err)=>{
        if(err){
            res.json({message:"unsucessful"})
        }
        else{
            res.json({message:"sucessful"})
        }
    })
    const formattedDate = new Date(date).toISOString().substring(0, 10);

    if(imagefile.name == "default-image.jpg" ){
        imagefile.name = "ra.jpg"
        console.log(imagefile.name)
    }
    const obj ={
        name: name,
        address: address,
        description: description,
        image :imagefile.name,
        likes:likes,
        date:formattedDate
}

const data = await insta_post.create(obj);
console.log(data)

})

app.get("/allpost",async(req,res)=>{
    const data = await insta_post.find().sort({ createdAt: -1 });
res.json(data);
 });

 app.get('/images/:filename',async(req,res)=>{
    res.sendFile(path.join(__dirname,`./imageUpload/${req.params.filename}`))
    // res.sendFile(`./imageUpload/${req.params.filename}`)
 })
app.listen(port ,()=>{console.log(`app is listening on ${port}`)})