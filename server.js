const express  = require('express');
const mongoose = require('mongoose')
require('dotenv').config({path: '.env.local'});


const app = express();
const port = 3000;

mongoose.set("strictQuery", false);
const mongodb = process.env.DB_URL

console.log(mongodb)

app.get('/', (req,res)=> {
    res.send('hello world')
});

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongodb);
}

app.listen(port, ()=>{
    console.log('server is running')
});