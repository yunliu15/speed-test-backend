const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd) res.status(400).json({'message': 'Username and password are required.'});

    const duplicated = await User.findOne({username: user}).exec();
    if (duplicated) return res.status(409).json({'message': 'This username is taken.'});

    try {
        // encrypt password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });
        res.status(201).json({'success': `New user ${user} created`})
    } catch(err) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser};