var mysql=require('mysql2');
var util=require('util');


let pool1=mysql.createPool({
    host:'localhost',
    connectionLimit:10,
    user:'root',
    password:'Gold420@',
    database:'test_demo',
    multipleStatements:true
})


pool1.getConnection((err,connection)=>{
    if(err){
        console.log(err)
        return
    }
    if(connection){
        console.log('connected')
        connection.release()
    }
    return
})




pool1.query=util.promisify(pool1.query);


module.exports=pool1