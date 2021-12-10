const Nexmo = require('nexmo');

exports.sendMessage = (req, res) => {

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    const nexmo = new Nexmo({
        apiKey: '35f5fda2',
        apiSecret: 'qpa2jimOVftJ4Bdv'
    });

    const from = 'TT DIEN TU TIN HOC';
    const to = req.params.phone;
    const text = `Mã xác thực của bạn là ${makeid()}`;

    nexmo.message.sendSms(
        from,
        to,
        text,
        (err, responseData) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(responseData);
            }
        }
    );
}