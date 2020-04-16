const express = require("express");
const bodyParser = require("body-parser");
const events = require('./events');
const app = express();
const PORT = 443;

app.use(bodyParser.json());

app.post("/leadinserted", (req, res) => {
    res.send('OK');
    const data = req.body;
    events.leadInserted(data);
    console.log(data);
});

app.post("/schedule", (req, res) => {
    res.send('OK');
    const data = req.body;
    events.schedule(data);
    console.log(data);
});

app.post("/leadqualified", (req, res) => {
    res.send('OK');
    const data = req.body;
   events.leadqualified(data);
    console.log(data);
});

app.post("/leadlost", (req, res) => {
    res.send('OK');
    const data = req.body;
    events.leadlost(data);
    console.log(data);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))