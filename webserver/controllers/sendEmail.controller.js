const LienHeModel = require('../models/LienHe.model');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        service: 'Gmail',
        auth: {
            user: 'ttdientutinhoc.test@gmail.com',
            pass: 'u$erCit@2021'
        }
    }
);

exports.sendAccount = (req, res) => {
    const options = {
        from: '"Trung Tâm Điện Tử & Tin Học - Trường Đại học Cần Thơ" <ttdientutinhoc.test@gmail.com>',
        to: req.body.HV_Email,
        subject: 'THÔNG TIN TÀI KHOẢN HỌC VIÊN',
        html: `
        <div style="width: 100%; margin: auto">
            <div style="width: 60%;margin: auto; padding: 20px; font-size: 16px;">
                <span>
                    Chào ${req.body.HV_HoTen},<br>
                    Gửi bạn thông tin tài khoản để đăng nhập hệ thống. Vui lòng đổi mật khẩu khi đăng nhập lần đầu để an toàn bảo mật hơn.<br>
                    Cảm ơn bạn đã đăng ký khoá học tại trung tâm. Nhanh chóng đến văn phòng trung tâm để hoàn tất thủ tục đăng ký và thanh toán học phí nhé.
                </span>
            </div>
            <div style="background-color: #dfe6e9; width: 250px; margin: auto; padding: 20px;font-size: 20px">
                <span> <b>Username</b> : ${req.params.id}</span> <br>
                <span> <b>Password</b> : u$erCit@2021</span>
            </div>
            <div style="margin-top: 50px">
                <span style="font-size: 14px; font-weight: bold; color: #182C61">TRUNG TÂM ĐIỆN TỬ TIN HỌC - TRƯỜNG ĐẠI HỌC CẦN THƠ</span><br>
                <span style="font-size: 12px; color: gray; font-style: italic">Địa chỉ : Khu II, Trường Đại học Cần Thơ, 3/2, P.Xuân Khánh, Q.Ninh Kiều, TP.Cần Thơ</span><br>
                <span style="font-size: 12px; color: gray; font-style: italic">Điện thoại : 0292 37 35 898</span>
            </div>
        </div>`
    }

    transporter.sendMail(
        options,
        (err, info) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Send successfully' });
            }
        }
    );
}

exports.replyContact = (req, res) => {
    const options = {
        from: '"Trung Tâm Điện Tử & Tin Học - Trường Đại học Cần Thơ" <ttdientutinhoc.test@gmail.com>',
        to: req.params.email,
        subject: req.body.subject,
        text: req.body.text
    }

    transporter.sendMail(
        options,
        (err, info) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                LienHeModel.isRead(
                    req.params.email,
                    (err) => {
                        if (err) {
                            return res.json({ status: 0, message: err });
                        } else {
                            return res.json({ status: 1, message: 'Send successfully' });
                        }
                    }
                );
            }
        }
    );
}

