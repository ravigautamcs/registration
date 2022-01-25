const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/registration")
//     .then(()=>{
//         console.log(`connection successfull with the database!!`);
//     })
//     .catch((e)=>{
//         console.log(`sorry the connection is not successfull`);
//         console.log(e);
//     });

const DB = 'mongodb+srv://ravi:ravi@cluster0.zlmqd.mongodb.net/registration?retryWrites=true&w=majority'

mongoose.connect(DB)
    .then(()=>{
        console.log(`connection successfull with the database!!`);
    })
    .catch((e)=>{
        console.log(`sorry the connection is not successfull`);
        console.log(e);
    });
    
