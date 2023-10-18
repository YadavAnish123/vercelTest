const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())

let bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 

const port = 5000
const mongoose = require('mongoose'); 
mongoose.set("strictQuery", false);
const url="mongodb+srv://portfilio:porftfilio123@cluster0.untqikx.mongodb.net/portfilioMessage?retryWrites=true&w=majority"
const mongooseConnected=mongoose.connect(url);
 
const MessageSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    }
})
let MessageModel=mongoose.model('MessagePortfilio',MessageSchema)

app.post('/messageMe', async(req, res) => {
  console.log("sending message")
  try{
    const Data=await MessageModel.create({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    })
   await Data.save();
    res.status(200).json({
        status:true,
        data:Data
    })
}catch(e){
    res.status(404).json({
        status:false,
        message:e.message,
        data:{}
    })
}

})
app.get('/', async(req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})