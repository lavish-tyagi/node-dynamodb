const express = require("express");
const app = express();

const DynamoDB = require("./dynamDB");
let dynamoDB = new DynamoDB();

app.get('/', async function(req,res){
    console.log('This is to check the server');
    res.send("This is to check the server")
})

app.get('/createTable', async function(req,res){
    let resp = await dynamoDB.createMusicTable();
    console.log(resp)
})

app.get('/getItem', async function(req,res){
    let resp = await dynamoDB.getItem('Music');
    console.log(resp)
})

app.get('/putItems', async function(req,res){
    let resp = await dynamoDB.putMusicItems('Music');
    console.log(resp)
})

app.get('/deleteTable', async function(req,res){
    let resp = await dynamoDB.deleteTable('Music');
    console.log(resp)
})

app.listen(4040);
console.log(`Server running on port 4040`)