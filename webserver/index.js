const express = require('express');

//create app express
const app = express();
var cors = require('cors');

const bodyParser = require('body-parser');

//setup server port
const port = 3000;


// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:4200' }));

// ******************* IMPORT ROUTE ***********************************
const phonghocRoute = require('./routes/PhongHoc.route');
const capDoTaiKhoanRoute = require('./routes/CapDoTaiKhoan.route');
const taiKhoanRoute = require('./routes/TaiKhoan.route');

// ******************* USE ROUTE ***********************************
app.use('/api/phonghoc', phonghocRoute);
app.use('/api/capdotaikhoan', capDoTaiKhoanRoute);
app.use('/api/taikhoan', taiKhoanRoute);

// ********************************************************************
app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
});