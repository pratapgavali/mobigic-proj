const User = require("../models/user");

exports.signup = (req, res) => {

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save in database"
            });
        }

        res.json({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            id: user._id

        });
    });

}

exports.signin = (req, res) => {

    const { email, password } = req.body;

    User.findOne({ email, password }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "USER email does not exists"
            });
        } else {
            res.json({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                id: user._id

            });
        }
    });
};

