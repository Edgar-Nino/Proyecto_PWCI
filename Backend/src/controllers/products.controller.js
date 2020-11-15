productsCtrl = {};

const Product = require('../models/products')
 

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
        const newProduct = new Product(req.body);

        await newProduct.save();

        res.send({ status: 'Se creo el producto' });
    }
    catch (e) {
        res.status(500).json({ status: "No se pudo crear el producto" })
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
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json({ status: 'Se actualizo el producto' });
    }
    catch (e) {
        res.status(500).json({ status: 'No se actualizo el producto' })
    }
}

productsCtrl.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ status: 'Se borro el producto' })
    }
    catch (e) {
        res.status(500).json({ status: 'No se borro el producto' })
    }
}

module.exports = productsCtrl;