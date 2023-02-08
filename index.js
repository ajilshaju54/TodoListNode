const express = require("express")

const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Todo = require("./models/Todo")



//middlewares

 app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


mongoose.connect(`mongodb+srv://ajilshaju:AJILSHAJU11@cluster0.boqrbsi.mongodb.net/test`,{
   useNewUrlParser:true,useUnifiedTopology:true
   }, () => { console.log("mongo connected")})



app.get("/",(req,res)=>{
   Todo.find()
   .then(result=>{ 
      res.render("view", {data:result})
      console.log(result);
   })
})

app.post("/", (req,res)=>{
   const todo = new Todo({
      
      todo : req.body.todovalue
   })

   todo.save()
   .then(result=>{
      res.redirect("/")
   })


})

app.delete("/:id",(req,res)=>{
   Todo.findByIdAndDelete(req.params.id)
   
   .then(result=>{
   
      console.log(result)
     
   }) 
})



app.post("/:id",(req,res)=>{
   
 Todo.findByIdAndUpdate({
   _id:req.params.id
 },{$set:{"marked":true}})

 .then(result=>{
   
   console.log(result)
  
}) 

   })


app.listen(3000, ()=>
   console.log("listening to localhost port 4000")
)