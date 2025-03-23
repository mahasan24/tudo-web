require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { query } = require('./helpers/db.js');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

// GET endpoint to fetch all tasks
app.get("/", async (req, res) => {
    try {
        const result = await query('SELECT * FROM task');
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

// POST endpoint to add a new task
app.post("/new", async (req, res) => {
    try {
        const result = await query(
            'INSERT INTO task (description) VALUES ($1) RETURNING *',
            [req.body.description]
        );
        res.status(200).json({ id: result.rows[0].id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

// DELETE endpoint to delete a task
app.delete("/delete/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await query(
            'DELETE FROM task WHERE id = $1',
            [id]
        );
        res.status(200).json({ id: id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});