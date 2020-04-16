const express = require("express");
const bodyParser = require("body-parser");
const events = require('./events');
const app = express();
const PORT = process.env.PORT || 9005;

app.use(bodyParser.json());

app.post("/leadinserted", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    events.leadInserted(data);
});

app.post("/schedule", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    events.schedule(data);
});

app.post("/leadqualified", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
   events.leadqualified(data);
});

app.post("/leadlost", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    events.leadlost(data);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))