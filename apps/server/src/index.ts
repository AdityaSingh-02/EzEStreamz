const express=require('express');
const cors=require('cors');
const app=express();
const port=4000;
app.use(cors());


app.get('/',(req:any,res:any)=>{
    res.send("hello...chal to raha hai try 2")
})
app.listen((port),(req:any,res:any)=>{
    console.log("done")
})