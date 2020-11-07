usersCtrl = {};

const User = require('../models/users')
const jwt = require('jsonwebtoken');


usersCtrl.getUsers = async (req, res) => {
    try {
        var users = await User.find()

        return res.json(users);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir los usuarios' })
    }
}

usersCtrl.getUser = async (req, res) => {
    try {
        var users = await User.findById(req.params.id, { password: 0 })

        return res.json(users);
    }
    catch (e) {
        return res.status(500).json({ status: 'No se pudo conseguir el usuario' })
    }
}

usersCtrl.profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(400).json({ status: 'No se pudo conseguir el profile' })
        res.json(user);
    } catch (e) {
        res.status(500).json({ status: 'No se pudo conseguir el usuario' })
    }
}

usersCtrl.editUser = async (req, res) => {
    try {
        if (req.userId != req.params.id) return res.status(400).json({ status: 'No tienes privilegios para editar este usuario' })
        u = new User;
        req.body.password = await u.encryptPassword(req.body.password);

        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.json({ status: 'Se actualizo el usuario' });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ status: 'No se actualizo el usuario' })
    }
}

usersCtrl.deleteUser = async (req, res) => {
    try {
        if (req.userId != req.params.id) return res.status(400).json({ status: 'No tienes privilegios para eliminar este usuario' })

        await User.findByIdAndDelete(req.params.id);
        return res.json({ status: 'El usuario se ha eliminado con exito' })

    } catch (e) {
        return res.status(500).json({ status: 'No se pudo eliminar el usuario' })
    }
}

usersCtrl.logIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).json({ status: 'El email o la contraseña estan mal' });

        const correctPass = await user.validatePassword(req.body.password);

        if (!correctPass) return res.status(400).json({ status: 'La contraseña esta mal' })

        const token = jwt.sign({ _id: user.id }, process.env.SECRETKEY || 'keyNoTanSecreta')

        return res.header('auth-token', token).json(user)
    } catch (e) {
        return res.status(500).json({ status: 'No se pudo logear' })
    }
}

usersCtrl.signUp = async (req, res) => {
    try {
        const newUser = new User(req.body)
        newUser.password = await newUser.encryptPassword(newUser.password);
        const UserReg = await newUser.save();
        const token = jwt.sign({ _id: UserReg._id }, process.env.SECRETKEY || 'keyNoTanSecreta');

        res.header('auth-key', token).json(UserReg)
    } catch (e) {
        res.status(500).json({ status: e.message })
    }
}

module.exports = usersCtrl;