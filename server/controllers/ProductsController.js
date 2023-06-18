const con = require('../DB/database');


exports.getAllProducts = async (req, res) => {
    await con.query("SELECT * FROM products", (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });

}
exports.getSingleProduct = async (req, res) => {
    res.send('single product')
}
exports.addProduct = async (req, res) => {
    res.send('add product')
}
exports.deleteProduct = async (req, res) => {
    res.send('delte product ')
}