const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs')
require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res)=>{
    // res.send("the first line of the registration project using the nodejs and the mongodb");
    res.render("index");
})

app.get("/register", (req, res)=>{
    res.render("register");
})

app.get("/login", (req, res)=>{
    
res.render("login")

})

app.post("/login", async (req, res)=>{
    try{

        const email = req.body.email;
        const password = req.body.pass;

        // console.log(`${email} and password is ${password}`)

        const useremail = await Register.findOne({email: email});
        // res.send(useremail.password);
        // console.log(useremail);

        if(password===useremail.password){
            console.log("login successfull!!!");
            res.status(201).render("success");
        }else{
            res.send("invalid login details!!")
        }

        
    }catch(error){
        res.status(400).send("Invalid Login details!!!")
    }
})

// creating a new user in the database;
app.post('/register', async (req, res)=>{
    try{

        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
        // res.send(req.body.lastname);
        

        const password = req.body.pass; 
        const cpassword = req.body.repass; 

        if(password===cpassword){

            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                email: req.body.email,
                number: req.body.phone,
                password: req.body.pass,
                confirmpassword: req.body.repass,
            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");

        }else{
            res.send("password are not same!!")
        }


    }
    catch (error){
        res.status(400).send(error);
    }
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})
