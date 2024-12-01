const express = require('express');
const { createItem, readItems, updateItem, deleteItem } = require('./crud');
const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get('/items', (req, res) => {
    readItems((err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
});

app.post('/items', (req, res) => {
    const { name, description } = req.body;
    createItem(name, description, (err, data) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send(`Item is added ID : ${data.id}`);
        }
    });
});

app.put('/items/:id', (req, res) => {
    const { name, description } = req.body;
    updateItem(req.params.id, name, description, (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send("Update item");
        }
    });
});

app.delete('/items/:id', (req, res) => { 
    deleteItem(req.params.id, (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send("Deleted item");
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
