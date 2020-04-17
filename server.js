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
    if (data.Lead != null)
        events.leadInserted(data);
});

app.post("/schedule", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    console.log(data.Lead.CamposPersonalizados);
    if (data.Lead != null)
        events.schedule(data);    
});

app.post("/leadqualified", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    console.log(data.Lead.CamposPersonalizados);
    if (data.Lead != null)
        events.leadQualified(data);
});

app.post("/leadlost", (req, res) => {
    res.sendStatus(200);
    const data = req.body;
    console.log(data.Lead.CamposPersonalizados);
    if (data.Lead != null)
        events.leadLost(data);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))