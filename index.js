const express=require("express");
const mongoose= require("mongoose");
const bodyParser=require("body-parser");
const dotenv=require("dotenv");

const app =express();
dotenv.config();

const port = process.env.PORT || 3000;
const username=process.env.MONGODB_USERNAME;
const password=process.env.MONGODB_PASSWORD;

const encodedPassword = encodeURIComponent("Sabirali@123");


// With this
mongoose.connect(`mongodb+srv://alisabir167167:${password}@cluster0.xkqzc6p.mongodb.net/registrationFormDB`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));



// registration Schema
const registrationSchema=new mongoose.Schema({
   name:String,
   email:String,
   password:String
})

//model of registration schema
const Registration = mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/pages/index.html");
})



app.post("/register",async(req,res)=>{
   try{
        const {name,email,password} = req.body;
        const existingUser=await Registration.findOne({email:email});
        if(!existingUser){
         const registrationData=new Registration({
            name,
            email,
            password
           });
           await registrationData.save();
           res.redirect("/success");
        }
        else{
         alert("user already exist");
         res.redirect("/error");
        }
        
   }
   catch(error){
      console.log(error);
      res.redirect("/error");
   }
})

app.get("/success",(req,res)=>{
   res.sendFile(__dirname+"/pages/success.html");
});
app.get("/error",(req,res)=>{
   res.sendFile(__dirname+"/pages/error.html");
});







app.listen(port,()=>{
   console.log(`server is running on ${port}`);
})
