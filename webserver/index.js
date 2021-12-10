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
const sendEmailRoute = require('./routes/sendEmail.route');
const baiVietRoute = require('./routes/BaiViet.route');
const giangDayRoute = require('./routes/GiangDay.route');
const thoiGianHocRoute = require('./routes/ThoiGianHoc.route');
const hoaDonRoute = require('./routes/HoaDon.route');
const heThongRoute = require('./routes/HeThong.route');
const chungChiRoute = require('./routes/ChungChi.route');
const dotThiRoute = require('./routes/DotThi.route');
const kiThiRoute = require('./routes/KyThi.route');
const dangKyThiRoute = require('./routes/DangKyThi.route');
// const sendSMSRoute = require('./routes/sendSMS.route');

// ******************* USE ROUTE ***********************************
app.use('/api/phonghoc', phonghocRoute);
app.use('/api/quyen', quyenRoute);
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
app.use('/api/sendEmail', sendEmailRoute);
app.use('/api/baiviet', baiVietRoute);
app.use('/api/giangday', giangDayRoute);
app.use('/api/thoigianhoc', thoiGianHocRoute);
app.use('/api/hoadon', hoaDonRoute);
app.use('/api/hethong', heThongRoute);
app.use('/api/chungchi', chungChiRoute);
app.use('/api/dotthi', dotThiRoute);
app.use('/api/kythi', kiThiRoute);
app.use('/api/dangkythi', dangKyThiRoute);
// app.use('/api/sendSMS', sendSMSRoute);

// ********************************************************************
app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
});