const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/test', function(req, res){ res.send('Hello World!')})

var url = "mongodb://localhost:27017/VjtiLogs"

app.post("/postdata",function (req,res) {
    MongoClient.connect(url,function (err,db) {
        if(err){
            console.log("Cannot connect to mongo server")
        }else{
            var collection = db.collection("message");

            req.body.time = new Date();
            collection.insert(req.body,function (err,response) {
                if(err){
                    console.log("unable to insert in database")
                }else{
                    res.send("Success")
                }
            })
        }
    });
});

app.get("/getmessage",function (req,res) {
    MongoClient.connect(url,function (err,db) {
        if(err){
            console.log("Cannot connect to mongo server")
        }else{
            var collection = db.collection("message");
            collection.find({}).toArray(function (err,msg) {
                if(err){
                    console.log("unable to find message")
                }else{
                    res.send(msg)
                    console.log(msg)
                }
            })
        }
    });
});



app.listen(3000,function () {
    console.log('Example app listening on port 3000!')
});