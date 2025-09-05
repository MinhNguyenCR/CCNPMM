const { createUserService, loginService, getUserService } = require("../services/userService");

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const data = await createUserService(username, email, password);
    return res.status(200).json(data);
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data);
}

const getUsers = async (req, res) => {
    const data = await getUserService();
    return res.status(200).json(data);
}

const getAccount = async (req, res) => {
    return res.status(200).json(req.user);
}

module.exports = {
    createUser, handleLogin, getUsers, getAccount
}
