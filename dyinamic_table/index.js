
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const pdf = require('pdf-creator-node');
const fs = require('fs');
const { ADDRGETNETWORKPARAMS } = require('dns');
const nodemailer = require('nodemailer');
const multer = require('multer');


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dynamic',{
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
  .then(() => {
    console.log('Db connected successfully');
  })
  .catch(() => {
    console.log('Db is not connected');
  });



  // Define a schema for storing file data
const fileSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  data: Buffer,
});
const File = mongoose.model('collections', fileSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.post('/post',(req,res)=>{
    var html = fs.readFileSync("./index.html", "utf8");
   
var options = {
    format: "A4",
    orientation: "portrait",
    border: "5mm",
    header: {
        height: "0mm",
       contents: `<div style="text-align:center;">hello </div>`
    },
    footer: {
        height: "20mm",
     
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};
const{Name,Gender,Email,Mobile,DOB,MaritalStatus,AadharNumber,BloodGroup}=req.body
var users = [
    {
     
     Name:Name,
     Gender:Gender,
     Email:Email,
     Mobile:Mobile,
     DOB:DOB,
     MaritalStatus:MaritalStatus,
     AadharNumber:AadharNumber,
     BloodGroup:BloodGroup,
     
    },
  ];
  var document = {
    html: html,
    data: {
      users: users,
    },
    path: "output.pdf",
    type: "",
  };

pdf
  .create(document, options)
  .then((res) => {
    console.log("pdf created");
  })
  .catch((error) => {
    console.error(error);
  });

  res.json("data send success")

})
app.listen(9000, () => {
  console.log('Server is running');
});

