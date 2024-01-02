
const express = require('express')
const app = express()
const mongoose =require('mongoose')
const bodyParser = require('body-parser');
const connection = require('./database')
const adminroute = require('./Router/admin')
const customerroute= require('./Router/customer');
const adminstatator = require('./adminstatator');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use("/admin",adminroute);
app.use("/customer",customerroute)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

connection.database_connection()
adminstatator.saveAdmin();

app.listen(5000, () => {
    console.log("Example app listening on port 5000:", 5000)
})