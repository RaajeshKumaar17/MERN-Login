const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
const path=require('path')
const EmployeeModel=require("./models/employee")

app.use(express.json())
app.use(cors())

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.log("Error connecting to MongoDB"))


app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No Record Existed")
        }
    })
})

app.post('/register',(req,res)=>{
    const { name, email, password } = req.body;

    
    EmployeeModel.findOne({ email: email })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).json({ message: "Email already exists" });
        }
  
        
        EmployeeModel.create({ name, email, password })
          .then((newEmployee) => res.json({ message: "Registration successful", user: newEmployee }))
          .catch((err) => res.status(500).json({ message: "Error in registration", error: err }));
      })
      .catch((err) => res.status(500).json({ message: "Error in email check", error: err }));
  });
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
    
})