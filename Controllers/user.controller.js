const users = require("../users.json");


module.exports.getRandomUser = (req, res) => {
    const randomUserId = String(Math.floor(Math.random() * 10) + 1);
    const randomUser = users.find(user => user._id === randomUserId)
    res.send(randomUser);
}

module.exports.getAllUser = (req, res) => {
    const { limit } = req.query;
    const result = users.slice(0, limit);
    res.send(result);
}

module.exports.saveUser = (req, res) => {
    const { name, gender, address, phone, picture } = req.body;
    const _id = String(users.length + 1);
    const newUserValidate = _id && name && gender && address && phone && picture;
    if (newUserValidate) {
        users.push({ _id, name, gender, address, phone, picture });
        res.send(users);
    }
}

module.exports.updateUser = (req, res) => {
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
            message: "Internal server error"
        })
    }
}

module.exports.updateManyUser = (req, res) => {
    const ids = req.body.ids;
    const updateUsersInfo = req.body.users;
    const updateUsersCollection = [];
    for (const id of ids) {
        users.find(user => {
            if (user._id === String(id)) {
                updateUsersCollection.push(user);
            }
        })
    }
    for (let i = 0; i < updateUsersCollection.length; i++) {
        const updateUserCollection = updateUsersCollection[i];
        const updateUserInfo = updateUsersInfo[i];
        for (const key in updateUserInfo) {
            updateUserCollection[key] = updateUserInfo[key]
        }
    }
    res.send(updateUsersCollection);
}

module.exports.deleteUser = (req, res) => {
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
            message: "Internal server error"
        })
    }
}