import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import postRoutes from './routes/post.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();


//Utilities
app.use(bodyParser.json({limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
//Routes
app.use('/posts',postRoutes);


// const MONGODB_URI = "mongodb+srv://vee_cee:vee_cee@cluster0.x5ajj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;


//Connection to DB
mongoose.connect(process.env.MONGODB_URI,({useNewUrlParser: true, useUnifiedTopology: true})).then(()=>{
    console.log("connected to DB");
}).catch((error)=>{
    console.log(error.message);
})

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`)
  });