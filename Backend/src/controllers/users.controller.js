usersCtrl = {};

const User = require('../models/users')
const List = require('../models/lists')
const Product = require('../models/products')

const jwt = require('jsonwebtoken');

const fs = require('fs')


usersCtrl.getUsers = async (req, res) => {
    try {
        var users = await User.find({$and:[{pubpriv:true}]},{password:0})

        return res.json(users);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir los usuarios' })
    }
}

usersCtrl.searchUser = async (req, res) => {
    try {
        var string = req.params.id;
        var regex = new RegExp([ string])

        const users = await User.find({ $and: [{username:{ $regex: regex, $options: 'i' }}, { $or: [{ pubpriv: true }, { user_id: req.userId }] }] })
        console.log(users)
        res.json(users);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: 'No se pudieron conseguir las listas' })
    }
}

usersCtrl.getUser = async (req, res) => {
    try {   
        var users = await User.findOne({$and:[{pubpriv:true},{_id:req.params.id}]}, { password: 0 })

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
        var user = await User.findById(req.userId, { password: 0 })

        if (!user) return res.status(400).json({ status: 'No has ingresado' })
        const editUser = new User();
        req.body.password = await editUser.encryptPassword(req.body.password);

        req.body.imgURL = req.file.filename;

        var oldUser = await User.findByIdAndUpdate(req.userId, req.body);

        await fs.unlink('./src/public/uploads/'+ user.imgURL, (err)=>{console.log(err)})

        await List.updateMany({user_id:oldUser._id}, {username:req.body.username});

        return res.json({ status: 'Se actualizo el usuario' });
    }
    catch (e) {
        console.log(e)
        await fs.unlink('./src/public/uploads/'+ req.file.filename, (err)=>{})
        return res.status(500).json({ status: 'No se actualizo el usuario' })
    }
}

usersCtrl.deleteUser = async (req, res) => {
    try {
        var user = await User.findById(req.userId, { password: 0 })

        if (!user) return res.status(400).json({ status: 'No has ingresado' })

        var oldUser = await User.findByIdAndDelete(req.userId);

        await List.deleteMany({user_id: oldUser._id})

        await Product.deleteMany({user_id: oldUser.user_id})

        await fs.unlink('./src/public/uploads/'+ user.imgURL, (err)=>{console.log(err)})

        res.status(200).clearCookie("auth-token").json({status: "El usuario se ha eliminado con exito"});

    } catch (e) {
        return res.status(500).json({ status: 'No se pudo eliminar el usuario' })
    }
}

usersCtrl.logIn = async (req, res) => {
    try {
        
        const user = await User.findOne({$or: [
            {email: req.body.identifier},
            {username: req.body.identifier}
        ]});

        if (!user) return res.status(400).json({ status: 'El email o la contraseña estan mal' });

        const correctPass = await user.validatePassword(req.body.password);

        if (!correctPass) return res.status(400).json({ status: 'La contraseña esta mal' })

        const token = jwt.sign({ _id: user.id }, process.env.SECRETKEY || 'keyNoTanSecreta')

        return res.status(200).cookie('auth-token', token).json(user)
    } catch (e) {
        return res.status(500).json({ status: 'No se pudo logear' })
    }
}

usersCtrl.signUp = async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.imgURL = req.file.filename;
        newUser.password = await newUser.encryptPassword(newUser.password);
        const UserReg = await newUser.save();
        const token = jwt.sign({ _id: UserReg._id }, process.env.SECRETKEY || 'keyNoTanSecreta');
        return res.status(200).cookie('auth-token', token).json(UserReg)
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: e.message })
        await fs.unlink('./src/public/uploads/'+ req.file.filename, (err)=>{})
    }

}

usersCtrl.logOut = async (req, res) => {
    try {
        res.status(200).clearCookie("auth-token").json({status: "Se hizo el logout con exito"});
    } catch (e) {
        res.status(500).json({ status: e.message })
    }

}

module.exports = usersCtrl;