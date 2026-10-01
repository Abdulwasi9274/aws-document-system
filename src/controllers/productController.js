const connection = require('../model/db');

let addProduct = (req, res) => {
    let { name, price, stock } = req.body;
    if (!name || price == undefined || stock == undefined) {
        return res.status(400).json({ message: "name,price and stock are required" })
    }
    let query = `insert into products(name, price, stock) values(?, ?,?)`;
    connection.query(query, [name, price, stock], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "database error", error })
        }
        return res.status(201).json({ message: "Product added successfully", data: { name, price, stock } })
    })
}

let getProduct = (req, res) => {
    let query = `select * from products`;
    connection.query(query, (error, result) => {
        if (error) {
            return res.status(500).json({ message: "database error", error })
        }
        return res.status(200).json({ message: "Product fetched successfully", data: result })
    })
}

let getProductById = (req, res) => {
    let query = `select name,price,stock,created_at from products where id=?`;
    connection.query(query, [req.params.id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "database error", error })
        }
        return res.status(200).json({ message: "Product fetched successfully", data: result[0] })
    })
}

let updateProduct = (req, res) => {
    let { name, price, stock } = req.body;
    if (!name || price == undefined || stock == undefined) {
        return res.status(400).json({ message: "name,price and stock are required" })
    }
    let query = `update products set name=?, price=?, stock=? where id=?`;
    connection.query(query, [name, price, stock, req.params.id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "database error", error })
        }
        return res.status(200).json({ message: "Product updated successfully", data: name, price, stock })
    })
}

let deleteProduct = (req, res) => {
    let query = `delete from products where id=?`;
    connection.query(query, [req.params.id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "database error", error })
        }
        return res.status(200).json({ message: "Product delete successfully" })
    })
}

module.exports = { addProduct, getProduct, getProductById, updateProduct, deleteProduct };