const mongoose = require("mongoose")


const TodoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required:true,
       
    }, marked:false
})


const todo = new mongoose.model("todo",TodoSchema)
module.exports = todo