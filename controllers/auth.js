module.exports.login = function (req, res) {
    const { email, password } = req.body;
    res.status(200).json({
        email,
        password
    });
}
module.exports.register = function (req, res) {
    res.status(200).json({
        register: true
    });
}
