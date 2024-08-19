const mysql = require('mysql');
const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(express.json());
app.use(cors());
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123madiha',
    database: 'trial'
})

const port = process.env.PORT || 5000;

app.get('/', function(req, res) {
    var sql = "Select * from demo";
    con.query(sql, function(error, result) {
        if (error) {
            console.log("error..");
        }
        else {
            res.json(result);
        }
    })
})
app.post('/create', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;

    var data1 = "Insert into demo(name, email, address) Values ?";
    var value1 = [
        [name, email, address]
    ]
    con.query(data1, [value1], function(error, result) {
        if (error) {
            console.log("Error..");
        }
        else {
            res.send(result);
        }
    });
    
});
app.put('/update/:id', function(req, res) {

    const data2 = "Update demo set name=?, email=?, address=? where id=?"
    var value2 = [
        req.body.name,
        req.body.email,
        req.body.address
    ]
    var id= req.params.id;
    con.query(data2, [...value2, id], function(error, result) {
        if (error) {
            console.log("Error..");
        }
        else {
            res.send(result);
        }
    });
});
app.delete('/student/:id', function(req, res) {
    var data3 = "Delete from demo where id=?";
    var id = req.params.id;
    con.query(data3, [id], function(error, result) {
        if (error) {
            console.log("Some Error..");
        }
        else {
            res.send(result);
        }
    })
})


app.listen(port, ()=> {
    console.log("Connecting..");
});