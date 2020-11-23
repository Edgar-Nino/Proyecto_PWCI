categoriesCtrl = {};

const Category = require('../models/categories')
const User = require('../models/users')

categoriesCtrl.getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir las categorias' })
    }
}

categoriesCtrl.createCategory = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId },);

        if ((!user) || (user.type != 0)) return res.status(400).json({ status: 'No tiene permitido crear productos' });

        const newCategory = new Category(req.body);

        await newCategory.save();

        res.send({ status: 'Se creo la categoria' });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: "No se pudo crear la categoria" })
    }
}

categoriesCtrl.getCategory = async (req, res) => {
    try {
        const product = await Category.findOne({ _id: req.params.id });
        res.json(product);
    }
    catch (e) {
        res.status(500).json({ status: "No se pudo conseguir la categoria" })
    }
}

categoriesCtrl.editCategory = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.userId},);

        if ((!user)||(user.type!=0)) return res.status(400).json({ status: 'No tiene permitido crear productos' });

        await Category.findByIdAndUpdate(req.params.id, req.body);
        res.json({ status: 'Se actualizo la categoria' });
    }
    catch (e) {
        res.status(500).json({ status: 'No se actualizo la categoria' })
    }
}

categoriesCtrl.deleteCategory = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.userId},);

        if ((!user)||(user.type!=0)) return res.status(400).json({ status: 'No tiene permitido crear productos' });

        await Category.findByIdAndDelete(req.params.id);
        res.json({ status: 'Se borro la categoria' })
    }
    catch (e) {
        res.status(500).json({ status: 'No se borro la categoria' })
    }
}

module.exports = categoriesCtrl;