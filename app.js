//task1
var express =require('express')
var bodyParser= require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors');
var app=new express()
//conecting to mangodb
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
mongoose.connect("mongodb+srv://abhinav:18541@cluster0.phxgany.mongodb.net/employs?retryWrites=true&w=majority",{useNewUrlparser: true})
mongoose.set('strictQuery', true);
//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async(req,res)=>{
 var data=req.body
 var employ=new Employee(data)
 await employ.save(
  (err,data)=>{
    if(err){
      res.json({"status":"error","error":err})
    }
    else{
      res.json({"status":"sucsess","Data":data})
    }
  }
 )
 console.log(data)
})
//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',(req,res)=>{
  Employee.find((err,data)=>{
    if(err){
      res.json({"status":"error","error":err})
    }
    else{
      res.json(data)
    }

  })

})
//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',(req,res)=>{
  var data=req.body
  Employee.find(data,(err,data)=>{
    if(err){
      res.json({"status":"error","error":err})
    }
    else{
      res.json(data)
    }

  })
})
//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',(req,res)=>{
  var position=req.body.position
  var location=req.body.location
  var name=req.body.name
  var salary=req.body.salary
  var data=req.body
   Employee.findOneAndUpdate(
    {
      "position":position,
      "location":location,
      "name":name,
      "salary":salary,
    },data,(err,data)=>{
      if (err) {
        res.json({"status":"error","error":err})
        
      } else {
        res.json({"status":"updated sucessfully","data":data})
      }
    }
  )
  
})
//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',(req,res)=>{
  var position=req.body.position
  var data=req.body
   Employee.findOneAndDelete(
    {
      "position":position
    },data,(err,data)=>{
      if (err) {
        res.json({"status":"error","error":err})
        
      } else {
        res.json({"status":"updated sucessfully","data":data})
      }
    }
  )
  
})
//task1
app.listen(3000,()=>{
  console.log('server started at port3000')
})
const path=require('path');
const { Employee } = require('./models/employ');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});




