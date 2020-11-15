listsCtrl = {};

const fs = require('fs')

const List = require('../models/lists')
const User = require('../models/users')

listsCtrl.getLists = async (req, res) => {
    try {
        const lists = await List.find({pubpriv:true})
        res.json(lists);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir las listas' })
    }
}

listsCtrl.createList = async (req, res) => {
    try {

        const user = await User.findOne({_id: req.userId},);

        if (!user) return res.status(400).json({ status: 'No tiene permitido crear listas' });

        const newList = new List(req.body);

        newList.username = user.username;
        newList.user_id = req.userId;
        newList.imgURL = req.file.filename;

        await newList.save();

        res.send({ status: 'Se creo la lista' });
    }
    catch (e) {
        res.status(500).json({ status: "No se pudo crear la lista" })
        await fs.unlink('./src/public/uploads/'+ req.file.filename, (err)=>{})
    }
}

listsCtrl.getList = async (req, res) => {
    try {
        const list = await List.findOne({$and:[{ _id: req.params.id },{pubpriv: true}]});
        res.json(list);
    }
    catch (e) {
        res.status(500).json({ status: "No se pudo conseguir la lista" })
    }
}

listsCtrl.editList = async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id });
        if (req.userId != list.user_id) return res.status(400).json({ status: 'No tienes privilegios para eliminar esta lista' })

        const user = await User.findOne({_id: req.userId},);

        req.body.imgURL = req.file.filename;
        req.body.username = user.username;

        await List.findByIdAndUpdate(req.params.id, req.body);

        await fs.unlink('./src/public/uploads/'+ list.imgURL, (err)=>{console.log(err)})

        res.json({ status: 'Se actualizo la lista' });
    }
    catch (e) {
        res.status(500).json({ status: 'No se actualizo la lista' })
    }
}

listsCtrl.myLists = async (req, res) => {
    try {
        const lists = await List.find({user_id:req.userId})
        res.json(lists);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir las listas' })
    }
}

listsCtrl.deleteList = async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id });
        if (req.userId != list.user_id) return res.status(400).json({ status: 'No tienes privilegios para eliminar esta lista' })

        await List.findByIdAndDelete(req.params.id);

        await fs.unlink('./src/public/uploads/'+ list.imgURL, (err)=>{console.log(err)})

        res.json({ status: 'Se borro la lista' })
    }
    catch (e) {
        res.status(500).json({ status: 'No se borro la lista' })
    }
}

module.exports = listsCtrl;