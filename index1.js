const express=require('express')
const app1=express();


app1.use(express.json());

var login1=require('./login1.js')

var getcomposefile=require('./getcomposedata.js')
var ap1=require('./ap1.js')

app1.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    next();
});


app1.use('/',login1)
app1.use('/ap',ap1)
app1.use('/get',getcomposefile)


app1.listen(3000,()=>{
    console.log('server listing on port 3000')
})