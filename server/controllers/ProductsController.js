const con = require('../DB/database');


exports.getAllProducts = async (req, res) => {
    await con.query("SELECT * FROM products", (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
}
exports.getSingleProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await new Promise((resolve, reject) => {
            con.query('SELECT * FROM products WHERE productID = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving product');
    }
}

exports.addProduct = async (req, res) => {
    const productName = req.body.productName;
    const category = req.body.category;
    const price = req.body.price;
    const shortDesc = req.body.shortDesc;
    const description = req.body.description;
    const rating = req.body.rating;
    const imgUrl = req.body.imgUrl;

    await con.query("INSERT INTO products(productName,category,price,shortDesc,description,rating,imgUrl) VALUES(?,?,?,?,?,?,?)",
        [productName, category, price, shortDesc, description, rating, imgUrl], (err, result) => {
            if (err) console.log(err);
            return res.status(200).json("product has been created.")
        })
}
exports.deleteProduct = async (req, res) => {
    res.send('delte product ')
}