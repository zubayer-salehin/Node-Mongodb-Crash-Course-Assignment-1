const users = require("../JSON/users.json");


module.exports.getRandomUser = (req, res, next) => {
    try {
        const randomUserId = String(Math.floor(Math.random() * 10) + 1);
        const randomUser = users.find(user => user._id === randomUserId)
        res.send(randomUser);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUser = (req, res, next) => {
    try {
        const { limit } = req.query;
        const result = users.slice(0, limit);
        res.send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.saveUser = (req, res, next) => {
    try {
        const { name, gender, address, phone, picture } = req.body;
        const _id = String(users.length + 1);
        const newUserValidate = _id && name && gender && address && phone && picture;
        if (newUserValidate) {
            users.push({ _id, name, gender, address, phone, picture });
            res.send(users);
        } else {
            res.status(500).send({
                success: false,
                message: "please send all user Information"
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports.updateUser = (req, res, next) => {
    try {
        const updateUserId = req.params.id;
        const userIdValidate = 0 < updateUserId && updateUserId <= users.length;
        const updateUserInfo = req.body;
        if (userIdValidate) {
            const getUpdateUser = users.find(user => user._id === updateUserId)
            for (const key in updateUserInfo) {
                getUpdateUser[key] = updateUserInfo[key]
            }
            res.send(getUpdateUser);
        } else {
            res.status(500).send({
                success: false,
                message: "Please send valid User Id"
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports.updateManyUser = (req, res, next) => {
    try {
        const updateManyUserInfo = req.body;
        const updateUserCollection = [];
        for (const singleUser of updateManyUserInfo) {
            const updateSingleUser = users.find(user => user._id == singleUser._id)
            for (const key in singleUser) {
                updateSingleUser[key] = singleUser[key]
            }
            updateUserCollection.push(updateSingleUser);
        }
        res.send(updateUserCollection);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteUser = (req, res, next) => {
    try {
        const deleteUserId = req.params.id;
        const userIdValidate = 0 < deleteUserId && deleteUserId <= users.length;
        const newUserCollection = [];
        if (userIdValidate) {
            users.find(user => {
                if (user._id !== deleteUserId) {
                    newUserCollection.push(user);
                }
            })
            res.send(newUserCollection);
        } else {
            res.status(500).send({
                success: false,
                message: "Please send valid User Id"
            })
        }
    } catch (error) {
        next(error);
    }
}