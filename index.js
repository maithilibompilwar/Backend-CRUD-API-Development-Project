var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect("mongodb://localhost:27017/Department")
.then(()=>{console.log("Connection Established")})
.catch((err)=>{console.log(err)})

const allstud = mongoose.Schema({
    "Roll":Number,
    "Name":String,
    "Percentage":Number
})

const StudModel = new mongoose.model('Student',allstud);

app.get("/api/student",(req,res)=>{
    StudModel.find({})
    .then((data)=>{res.send(data)})
    .catch((err)=>{console.log(err)})
})

app.use(express.json());

app.post("/api/student",(req,res)=>{
    const s = req.body;
    StudModel.create(s)
    .then((data)=>{res.send(data)})
    .catch((err)=>{console.log(err)})
})

app.put('/api/student/:id',(req,res)=>{
    const id = req.params.id;
    StudModel.findByIdAndUpdate({"_id":id},{"Percentage":req.body.Percentage})
    .then((data)=>{res.send(data)})
    .catch((err)=>{console.log(err)})
})

app.delete('/api/student/:id',(req,res)=>{
    const id = req.params.id;
    StudModel.findByIdAndDelete({"_id":id})
    .then(()=>{
        res.send("Object Deleted")
    })
    .catch((err)=>{console.log(err)})
})

app.listen(8002,()=>{
    console.log("Server started");
})
