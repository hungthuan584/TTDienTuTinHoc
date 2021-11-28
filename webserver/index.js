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
app.use(bodyParser.json({ limit: "100mb" }));

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
const dangKyHocRoute = require('./routes/DangKyHoc.route');
const nhanVienRoute = require('./routes/NhanVien.route');
const chucVuRoute = require('./routes/ChucVu.route');
const chucNangRoute = require('./routes/ChucNang.route');
const phanQuyenRoute = require('./routes/PhanQuyen.route');
const uploadImageRoute = require('./uploadImage.route');
const lienHeRoute = require('./routes/LienHe.route');

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
app.use('/api/dangkyhoc', dangKyHocRoute);
app.use('/api/nhanvien', nhanVienRoute);
app.use('/api/chucvu', chucVuRoute);
app.use('/api/chucnang', chucNangRoute);
app.use('/api/phanquyen', phanQuyenRoute);
app.use('/api/images', uploadImageRoute);
app.use('/api/lienhe', lienHeRoute);

// ********************************************************************
app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
});