var express = require('express');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var mysql = require('./db1.js')
var app1 = express()


app1.use(express.json());
app1.use(cors());


const signatureKey = 'pavan123@'

const option={expiresIn:'1h'}



app1.post('/', async (req, res) => {
    let uname = req.body.uname;
    let pwd = req.body.pwd;
    const query_str = `CALL Check_User(?,?,@uid,@uname); SELECT @uid UID, @uname UNAME`;

    try {
        const result = await mysql.query(query_str, [uname, pwd]);
        console.log(result);
        if (result[1][0].UID > 0) {
            let token = jwt.sign({ ID: result[1][0].UID, NAME: result[1][0].UNAME }, signatureKey,option);
            console.log(token);
            res.status(200).json({
                message: "Authentication successful",
                UID: result[1][0].UID,
                UNAME: result[1][0].UNAME,
                token: token
            });
        } else {
            res.status(401).json({
                message: "Invalid username or password."
            });
        }
    } catch (error) {
        console.log("error occurred", error);
        res.status(400).send({
            "code": 400,
            "failed": "Error occurred during authentication"
        });
    }
});

app1.get('/dd', async (req, res) => {
    let readToken_header = req.headers.authorization;

    console.log(readToken_header, "This came from Browser Headers.");
    res.status(200).json({g:readToken_header})

});




app1.post('/lo', async (req, res) => {
    let uid = req.body.id;

    query_str = `CALL groups1_Info(?)`;


    try {
        result = await mysql.query(query_str, [uid])
        let a = result;
        res.status(200).json({
            mess: a[0]

        })
    }

    catch (error) {
        console.log("error ocurred", error);
        res.send({
            "code": 400,
            "failed": "error ocurred"
        });
    }

})




app1.post('/log', async (req, res) => {
    let uid = req.body.id;

    query_str = `CALL Get_Temps(?)`;


    try {
        result = await mysql.query(query_str, [uid])
        let a = result;
        res.status(200).json({
            mess: a[0]

        })
    }

    catch (error) {
        console.log("error ocurred", error);
        res.send({
            "code": 400,
            "failed": "error ocurred"
        });
    }

})



app1.post('/logi', async (req, res) => {
    let uid = req.body.id;

    query_str = `CALL Get_Msgs(?)`;


    try {
        result = await mysql.query(query_str, [uid])
        let a = result;
        res.status(200).json({
            mess: a[0]

        })
    }

    catch (error) {
        console.log("error ocurred", error);
        res.send({
            "code": 400,
            "failed": "error ocurred"
        });
    }

})





module.exports = app1