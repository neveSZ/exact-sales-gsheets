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
    console.log(data.Lead.CamposPersonalizados);
    events.leadInserted(data);
});

app.post("/schedule", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    console.log(data.Lead.CamposPersonalizados);
});

app.post("/leadqualified", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    console.log(data.Lead.CamposPersonalizados);
});

app.post("/leadlost", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    console.log(data.Lead.CamposPersonalizados);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))