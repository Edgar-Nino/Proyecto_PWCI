productsCtrl = {};

const Product = require('../models/products')
const List = require('../models/lists')
const User = require('../models/users')

const fs = require('fs')

productsCtrl.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.json(products);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir los productos' })
    }
}

productsCtrl.getProductsNav = async (req, res) => {
    try {
        var numberPage = (req.params.id) ? req.params.id : 1;
        var numberDocs = 6 * numberPage;
        var numberSkipped = 6 * (numberPage - 1)
        const products = await Product.find().skip(numberSkipped).limit(numberDocs).sort({ createdAt: -1 })
        res.json(products);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir los productos' })
    }
}

productsCtrl.createProduct = async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.userId },);

        if (!user) {
            await fs.unlink('./src/public/uploads/' + req.file.filename, (err) => { })
            return res.status(400).json({ status: 'No tiene permitido crear productos' });
        }

        const list = await List.findOne({ _id: req.body.id_list },);

        if (!list) {
            await fs.unlink('./src/public/uploads/' + req.file.filename, (err) => { })
            return res.status(400).json({ status: 'No existe la lista donde quieres poner tu producto' });
        }

        if (list.user_id != req.userId) {
            await fs.unlink('./src/public/uploads/' + req.file.filename, (err) => { })
            return res.status(400).json({ status: 'No eres dueño de la lista' });
        }

        const newProduct = new Product(req.body);

        newProduct.imgURL = req.file.filename;
        newProduct.user_id = req.userId;

        await newProduct.save();

        res.send({ status: 'Se creo el producto' });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: "No se pudo crear el producto" })
        await fs.unlink('./src/public/uploads/' + req.file.filename, (err) => { })
    }
}

productsCtrl.getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        res.json(product);
    }
    catch (e) {
        res.status(500).json({ status: "No se pudo conseguir el producto" })
    }
}

productsCtrl.editProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) {
            await fs.unlink('./src/public/uploads/' + req.file.filename, (err) => { })
            return res.status(400).json({ status: 'No se encontro el producto a actualizar' });
        }

        const list = await List.findOne({ _id: product.id_list });

        const user = await User.findOne({ _id: req.userId },);

        if (!user || user._id != list.user_id) {
            await fs.unlink('./src/public/uploads/' + req.file.filename, (err) => { })
            return res.status(400).json({ status: 'No tiene permitido actualizar productos' });
        }

        req.body.user_id = user._id;
        req.body.id_list = product.id_list;

        req.body.imgURL = req.file.filename;

        await Product.findByIdAndUpdate(req.params.id, req.body);

        await fs.unlink('./src/public/uploads/' + product.imgURL, (err) => { console.log(err) })

        res.json({ status: 'Se actualizo el producto' });
    }
    catch (e) {
        res.status(500).json({ status: 'No se actualizo el producto' })
        await fs.unlink('./src/public/uploads/' + req.file.filename, (err) => { })
    }
}

productsCtrl.deleteProduct = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId },);
        if (!user) return res.status(400).json({ status: 'No tiene permitido borrar productos' });

        var product = await Product.findByIdAndDelete(req.params.id);

        await fs.unlink('./src/public/uploads/' + product.imgURL, (err) => { console.log(err) })

        res.json({ status: 'Se borro el producto' })
    }
    catch (e) {
        res.status(500).json({ status: 'No se borro el producto' })
    }
}

module.exports = productsCtrl;