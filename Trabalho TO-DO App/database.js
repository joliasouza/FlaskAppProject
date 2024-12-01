const sqlite3 = require('sqlite3').verbose()
const dbName = 'myDatabase.db'

let db = new sqlite3.Database(dbName, (err) => {
    if(err){
        console.error(err.message)
    }
    else{
        console.log("Connected to the Database")
        db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)', (err) => {
            if(err){
                console.error(err.message)
            }
            else{
                console.log("Table created or existed")
            }
        })
    }
})

module.exports = db