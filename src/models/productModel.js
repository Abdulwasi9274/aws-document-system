import db from '../config/db.js'


export const createProduct = async (name, price, stock) => {
    const [result] = await db.query(
        "INSERT INTO products (name, price, stock) VALUES (?,?,?)", [name, price, stock]
    )
    return result;
}

export const getAllProducts = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM products ORDER BY id DESC"
    )
    return rows;
}

export const getProductById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM products WHERE id =?", [id]
    )
    return rows[0];
}


export const updateProduct = async (id, name, price, stock) => {
    const [result] = await db.query("UPDATE products SET name=?, price=?, stock=? WHERE id=?", [name, price, stock, id])
    return result;

}

export const deleteProduct = async (id) => {
    const [result] = await db.query("DELETE FROM products WHERE id=?", [id]);
    return result;
}