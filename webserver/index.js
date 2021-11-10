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
const quyenRoute = require('./routes/Quyen.route');
const uuDaiRoute = require('./routes/UuDai.route');
const thongBaoRoute = require('./routes/ThongBao.route');
const taiKhoanRoute = require('./routes/TaiKhoan.route');
const hocVienRoute = require('./routes/HocVien.route');
const lopDaoTaoRoute = require('./routes/LopDaoTao.route');
const lopHocRoute = require('./routes/LopHoc.route');
const giaoVienRoute = require('./routes/GiaoVien.route');


// ******************* USE ROUTE ***********************************
app.use('/api/phonghoc', phonghocRoute);
app.use('/api/quyen', quyenRoute);
app.use('/api/uudai', uuDaiRoute);
app.use('/api/thongbao', thongBaoRoute);
app.use('/api/taikhoan', taiKhoanRoute);
app.use('/api/hocvien', hocVienRoute);
app.use('/api/lopdaotao', lopDaoTaoRoute);
app.use('/api/lophoc', lopHocRoute);
app.use('/api/giaovien', giaoVienRoute);

// ********************************************************************
app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
});