productsCtrl = {};

const Product = require('../models/products')
const User = require('../models/users')

const fs = require('fs')

productsCtrl.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products);
    }
    catch (e) {
        res.status(500).json({ status: 'No se pudieron conseguir los productos' })
    }
}

productsCtrl.createProduct = async (req, res) => {
    try {

        const user = await User.findOne({_id: req.userId},);

        if ((!user)||(user.type!=0)) return res.status(400).json({ status: 'No tiene permitido crear productos' });

        const newProduct = new Product(req.body);

        newProduct.imgURL = req.file.filename;

        await newProduct.save();

        res.send({ status: 'Se creo el producto' });
    }
    catch (e) {
        res.status(500).json({ status: "No se pudo crear el producto" })
        await fs.unlink('./src/public/uploads/'+ req.file.filename, (err)=>{})
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

        const user = await User.findOne({_id: req.userId},);
        if ((!user)||(user.type!=0)) return res.status(400).json({ status: 'No tiene permitido actualizar productos' });

        req.body.imgURL = req.file.filename;

        await Product.findByIdAndUpdate(req.params.id, req.body);

        await fs.unlink('./src/public/uploads/'+ product.imgURL, (err)=>{console.log(err)})

        res.json({ status: 'Se actualizo el producto' });
    }
    catch (e) {
        res.status(500).json({ status: 'No se actualizo el producto' })
        await fs.unlink('./src/public/uploads/'+ req.file.filename, (err)=>{})
    }
}

productsCtrl.deleteProduct = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.userId},);
        if ((!user)||(user.type!=0)) return res.status(400).json({ status: 'No tiene permitido borrar productos' });

        await Product.findByIdAndDelete(req.params.id);
        res.json({ status: 'Se borro el producto' })
        await fs.unlink('./src/public/uploads/'+ product.imgURL, (err)=>{console.log(err)})
    }
    catch (e) {
        res.status(500).json({ status: 'No se borro el producto' })
    }
}

module.exports = productsCtrl;