require('dotenv/config');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT;
const events = require("./events")

app.use(bodyParser.json());

app.post("/leadinserted", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    console.log(data);
    events.leadInserted(data);
});

app.post("/schedule", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    events.schedule(data.Lead.Etapas);
});

app.post("/leadqualified", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
   events.leadQualified(data.Lead.Etapas);
});

app.post("/leadlost", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    events.leadLost(data.Lead.Etapas);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))