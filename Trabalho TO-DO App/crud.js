const db = require('./database.js')

//CREATE
const createItem = (name, description, callback) => {
    const sql = 'INSERT INTO items (name, description) VALUES (?, ?)'
    db.run(sql, [name, description], function(err) {
        if (err) {
            return callback(err)
        }
        callback(err, {id: this.lastID})
    })
}

const readItems = (callback) => {
    const sql = 'SELECT * FROM items';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return callback(err)
        }
        callback(null, rows)
    })
}

const updateItem = (id, name, description, callback) => {
    const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?'
    db.run(sql, [title, description, id], function (err) {
        if (err) {
            return callback(err)
        }
        callback(null, { changes: this.changes })
    })
}

const deleteItem = (id, callback) => {
    const sql = 'DELETE FROM items WHERE id = ?'
    db.run(sql, [id], function (err) {
        if (err) {
            return callback(err)
        }
        callback(null, { changes: this.changes })
    })
}

module.exports = {createItem, readItems, updateItem, deleteItem}