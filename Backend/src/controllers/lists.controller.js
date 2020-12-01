listsCtrl = {};

const fs = require('fs');

const List = require('../models/lists')
const Product = require('../models/products')
const User = require('../models/users')

listsCtrl.getLists = async (req, res) => {
    try {
        const lists = await List.find({ pubpriv: true }).sort({ createdAt: -1 })
        res.json(lists);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir las listas' })
    }
}

listsCtrl.getListsNav = async (req, res) => {
    try {
        var numberPage = (req.params.id) ? req.params.id : 1;
        var numberDocs = 6 * numberPage;
        var numberSkipped = 6 * (numberPage - 1)
        const lists = await List.find({ pubpriv: true }).skip(numberSkipped).limit(numberDocs).sort({ createdAt: -1 })
        res.json(lists);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir las listas' })
    }
}

listsCtrl.createList = async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.userId },);

        if (!user) {
            await fs.unlink('./src/public/uploads/' + req.file.filename, (err) => { })
            return res.status(400).json({ status: 'No tiene permitido crear listas' });
        }

        const newList = new List(req.body);

        newList.username = user.username;
        newList.user_id = req.userId;
        newList.imgURL = req.file.filename;

        await newList.save();

        res.send({ status: 'Se creo la lista' });
    }
    catch (e) {
        res.status(500).json({ status: "No se pudo crear la lista" })
        await fs.unlink('./src/public/uploads/' + req.file.filename, (err) => { })
    }
}

listsCtrl.getList = async (req, res) => {
    try {
        const list = await List.findOne({
            $and: [
                { _id: req.params.id }, { $or: [{ pubpriv: true }, { user_id: req.userId }] }]
        });
        res.json(list);
    }
    catch (e) {
        res.status(500).json({ status: "No se pudo conseguir la lista" })
    }
}

listsCtrl.getListProducts = async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id })

        if (!list) return res.status(400).json({ status: "La lista que estas buscando no existe" })

        if ((list.user_id != req.userId) && (!list.pubpriv)) return res.status(400).json({ status: "Los productos de la lista que estas buscando son privados" })

        const products = await Product.find({ id_list: req.params.id }).sort({ createdAt: -1 })

        res.json(products);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ status: 'No se pudieron conseguir los productos' })
    }
}

listsCtrl.isMyList = async (req, res) => {
    try {
        const list = await List.findOne({
            $and: [
                { _id: req.params.id }, { user_id: req.userId }]
        });

        if (list) {
            res.json({ isMyList: true });
        } else {
            res.json({ isMyList: false });
        }

    }
    catch (e) {
        res.status(500).json({ status: "No se pudo conseguir la lista" })
    }
}

listsCtrl.editList = async (req, res) => {
    try {

        const list = await List.findOne({ _id: req.params.id });
        if (req.userId != list.user_id) {
            await fs.unlink('./src/public/uploads/'+ req.file.filename, (err)=>{})
            return res.status(400).json({ status: 'No tienes privilegios para editar esta lista' })}

        const user = await User.findOne({ _id: req.userId },);

        req.body.imgURL = req.file.filename;
        req.body.user_id = req.userId;
        req.body.username = user.username;

        await List.findByIdAndUpdate(req.params.id, req.body);

        await fs.unlink('./src/public/uploads/' + list.imgURL, (err) => { console.log(err) })

        res.json({ status: 'Se actualizo la lista' });
    }
    catch (e) {
        res.status(500).json({ status: 'No se actualizo la lista' })
        await fs.unlink('./src/public/uploads/' + req.file.filename, (err) => { })
    }
}

listsCtrl.searchList = async (req, res) => {
    try {
        var numberPage = (req.params.page) ? req.params.page : 1;
        var numberDocs = 6 * numberPage;
        var numberSkipped = 6 * (numberPage - 1)

        var string = req.params.id;
        var regex = new RegExp([string])

        const lists = await List.find({
            $and: [{ name: { $regex: regex, $options: 'i' } }, { $or: [{ pubpriv: true }, { user_id: req.userId }] }]
        }
        ).skip(numberSkipped).limit(numberDocs).sort({ createdAt: -1 })
        res.json(lists);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir las listas' })
    }
}

listsCtrl.myLists = async (req, res) => {
    try {
        const lists = await List.find({ user_id: req.userId })
        res.json(lists);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: 'No se pudieron conseguir las listas' })
    }
}

listsCtrl.deleteList = async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id });
        if (req.userId != list.user_id) return res.status(400).json({ status: 'No tienes privilegios para eliminar esta lista' })


        var oldList = await List.findByIdAndDelete(req.params.id);

        await Product.deleteMany({ id_list: oldList._id });

        await fs.unlink('./src/public/uploads/' + list.imgURL, (err) => { console.log(err) })

        res.json({ status: 'Se borro la lista' })
    }
    catch (e) {
        res.status(500).json({ status: 'No se borro la lista' })
    }
}

module.exports = listsCtrl;