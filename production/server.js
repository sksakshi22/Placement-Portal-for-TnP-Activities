const express =require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
var path = require('path')
const ejs=require('ejs');

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/')));

//databse connect
mongoose.connect("mongodb+srv://project_grp_25:12345@cummins1.onqpc.mongodb.net/PlacementPortal",{useNewUrlParser:true},)

//database schema
const studentSchema={
    rollno:String,
    cno :String,
    name:String,
    branch:String,
    email:String,
    phone :String,
    batch:String,
    status: String
}

//database model
const Student=mongoose.model("Student",studentSchema);

app.get('/btechIS',(req,res)=>{
    Student.find({},function(err,students){
        res.render('btechIS',{
            studentList:students
        })
    })
})

app.get("/studentRegistrationForm",function(req,res){
  res.sendFile(__dirname+"/studentRegForm.html");
    //res.sendFile(__dirname+"/indexAdmin.html");  
})


app.get('/', function (req, res,html) {
    res.sendFile((__dirname+'/indexAdmin.html'));
   });

   app.get('/drives', function (req, res,html) {
    res.sendFile((__dirname+'/drives.html'));
   });

   
app.post("/studentRegistrationForm",function(req,res){
    let newNote=new Student({
        rollno:req.body.rollno,
        cno:req.body.cno,
        name:req.body.name,
        branch:req.body.branch,
        email:req.body.email,
        phone:req.body.phone,
        batch:req.body.batch,
        status:req.body.status
    });
    newNote.save();
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("server is ruuning");
})