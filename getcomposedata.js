var express = require('express');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var mysql = require('./db1.js');
const pool1 = require('./db1.js');
var app1 = express()


app1.use(express.json());
app1.use(cors());


const signatureKey = 'pavan123@'


app1.get('/', async (req, res) => {
    
    try {


let gettokenfrmheader = req.headers.authorization;
    const decordetkn = jwt.verify(gettokenfrmheader, signatureKey)

    console.log("this is decode data", decordetkn.ID)


    query_str1 = `CALL SenderData(?)`,
    query_str2 = `CALL groups1_Info(?)`,
    query_str3 = `CALL Get_Msgs(?)`,
    query_str4 = `CALL Get_Temps(?)`



        resultofqury1 = await pool1.query(query_str1, [decordetkn.ID]);
        resultofqury2 = await pool1.query(query_str2, [decordetkn.ID]);
        resultofqury3 = await pool1.query(query_str3, [decordetkn.ID]);
        resultofqury4 = await pool1.query(query_str4, [decordetkn.ID]);

        console.log(resultofqury1[0], resultofqury2[0],resultofqury3[0],resultofqury4[0])
        


        if (decordetkn.ID > 0) {

            let a = resultofqury1[0]
            let b = resultofqury2[0];
            let c = resultofqury3[0];
            let d = resultofqury4[0]
            res.status(200).json({
                SenderData: a,
                groups1_Info: b,
                Get_Msgs: c,
                Get_Temps: d

            })
        }
        else {
            res.status(401).json({
                message: "Invalid username or password."
            });
        }
    }
    catch (err) {
        console.log(err);

    }

})



module.exports = app1