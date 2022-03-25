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
const recruiterSchema={
    company:String,
    name:String,
    designation:String,
    email:String,
    phone :String,
    year:String
}

const tpoRoleSchema={
    name:String,
    designation:String,
    email:String,
    phone :String,
    mobile:String
}

const companySchema={
    name:String,
    location:String,
    ctc:String,
    cgpa :String,
    branch:String,
    job :String,
    year:String
}

//database model
const Student=mongoose.model("Student",studentSchema);
const Recruiter=mongoose.model("Recruiter",recruiterSchema);
const Company=mongoose.model("Company",companySchema);
const TpoRole=mongoose.model("TpoRole",tpoRoleSchema);

//index admin pages
app.get('/btechIS',(req,res)=>{
    Student.find({},function(err,students){
        res.render('btechIS',{
            studentList:students
        })
    })
})

app.get('/btechComp',(req,res)=>{
    Student.find({},function(err,students){
        res.render('btechComp',{
            studentList:students
        })
    })
})
app.get('/btechMechanical',(req,res)=>{
    Student.find({},function(err,students){
        res.render('btechMechanical',{
            studentList:students
        })
    })
})
app.get('/btechIT',(req,res)=>{
    Student.find({},function(err,students){
        res.render('btechIT',{
            studentList:students
        })
    })
})
app.get('/btechEntc',(req,res)=>{
    Student.find({},function(err,students){
        res.render('btechEntc',{
            studentList:students
        })
    })
})
app.get('/tpoRoles',(req,res)=>{
    TpoRole.find({},function(err,tpoRoles){
        res.render('tpoRoles',{
            tpoRoleList:tpoRoles
        })
    })
})

app.get('/recruiterHistory',(req,res)=>{
    Recruiter.find({},function(err,recruiters){
        res.render('recruiterHistory',{
            recruiterList:recruiters
        })
    })
})
app.get('/visitedCompanies',(req,res)=>{
    Company.find({},function(err,companies){
        res.render('visitedCompanies',{
            visitedCompanyList:companies
        })
    })
})

app.get("/studentRegistrationForm",function(req,res){
  res.sendFile(__dirname+"/studentRegForm.html");
    //res.sendFile(__dirname+"/indexAdmin.html");  
})
app.get("/RecruiterRegistrationForm",function(req,res){
    res.sendFile(__dirname+"/recruiterRegForm.html");
      //res.sendFile(__dirname+"/indexAdmin.html");  
  })

  app.get("/visitedCompanyRegistrationForm",function(req,res){
    res.sendFile(__dirname+"/visitedCompanyRegForm.html");
      //res.sendFile(__dirname+"/indexAdmin.html");  
  })
  
  app.get("/tpoRegistrationForm",function(req,res){
    res.sendFile(__dirname+"/tpoRegForm.html");
      //res.sendFile(__dirname+"/indexAdmin.html");  
  })
  
app.get("/recruiterHistory",function(req,res){
    res.render("recruiterHistory");
  })
  app.get("/visitedCompanies",function(req,res){
    res.render("visitedCompanies");
  })


app.get('/', function (req, res,html) {
    res.sendFile((__dirname+'/mainLogin.html'));
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

app.post("/RecruiterRegistrationForm",function(req,res){
    let newNote=new Recruiter({
        company:req.body.company,
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        year:req.body.year
    });
    newNote.save();
    res.redirect("recruiterHistory");
})

app.post("/tpoRegistrationForm",function(req,res){
    let newNote=new TpoRole({
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        mobile:req.body.mobile
    });
    newNote.save();
    res.redirect("tpoRoles");
})

app.post("/visitedCompanyRegistrationForm",function(req,res){
    let newNote=new Company({
        name:req.body.name,
        location:req.body.location,
        ctc:req.body.ctc,
        cgpa:req.body.cpga,
        branch:req.body.branch,
        job:req.body.job,
        year:req.body.year
    });
    newNote.save();
    res.redirect("visitedCompanies");
})


app.listen(3000,function(){
    console.log("server is ruuning");
})