var express = require('express');
var cors = require('cors');

var mysql = require('./db1.js')
var app1 = express()


app1.use(express.json());
app1.use(cors());


app1.post('/log', async (req, res) => {
    let uid = req.body.id;
    let mobcnt = req.body.mobcnt;
    let rt = req.body.rt;
    let sname = req.body.sname;
    let msg1 = req.body.msg1;
    let campname = req.body.campname;
    let msg = req.body.msg;
    let mob2 = req.body.mob2;
    let pushmno = req.body.pushmno;
    let mob1 = req.body.mob1;
    let uc=0

    query_str = `CALL Get_SMSTransactionid(?,?,?,?,?,?,?,?,@ret)`;
    query_str1 = `CALL Mnos_Data_Insert(?,?,?,?,?,?,1)`;
    query_str2 = `CALL Save_COMPOSE_SMS(?,?,?,?,1,@sta)`;


    try {

        if (5)  {
            result = await mysql.query(query_str, [uid, mobcnt, 'c', rt, 0, sname, msg1, campname])
            result1 = await mysql.query(query_str1, [uid, sname, msg, mob2, pushmno])
            result2 = await mysql.query(query_str2, [uid, mob1, msg, sname])
            // let a = result;
            // let b = result1;
            // let c = result2;
            if(uc==0){
              let name=`$(rt),sname,tid,'E',hDLT_TID`
            //   res.status(200).json({
            //     mess: name
                // a[0],
                // b: b,

            //   })
            }
            else{
              let name1=`$(rt),sname,tid,'E',hDLT_TID`
              
            }
               res.status(200).json({
                mess: name1})


        }
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


