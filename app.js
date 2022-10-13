
const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const https = require('https');

const app = express();

// different routes: post get put delete patch

// allows you to reference static files like /images and /stylesheets
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res){
    // sends files as the response to the server
    res.sendFile(__dirname + '/signup.html');

});

app.post('/failure', function(req, res){
    res.redirect('/');
})

app.post('/', function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    //console.log(firstName + ' ' + lastName + ' ' + email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]

    }
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/57fe16f457";

    const options = {
        method: 'POST',
        auth: "moshaik1:594c0ea650901b4242327170a722c462-us21"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        }else{
            res.sendFile(__dirname + '/failure.html');
        }

        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})




app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});

// API key
//594c0ea650901b4242327170a722c462-us21
// List ID, identify which list youre using
// 57fe16f457

