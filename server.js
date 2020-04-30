require('dotenv/config');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT;
const events = require("./events")

app.use(bodyParser.json());

app.post("/leadinserted", (req, res) => {
    const data = req.body;
    if (data.Lead != null) {
        res.sendStatus(200);
        console.log(`Lead inserido, id do Lead: ${data.Lead.id}`);
        events.leadInserted(data);
    } 
});

app.post("/schedule", (req, res) => {

    const data = req.body;
    if (data.Lead != null) {
        res.sendStatus(200);
        console.log(`Lead agendado, id do Lead: ${data.Lead.id}`);
        events.schedule(data);
    }

});

app.post("/leadqualified", (req, res) => {
    const data = req.body;
    if (data.Lead != null) {
        res.sendStatus(200);
        console.log(`Lead qualificado, id do Lead: ${data.Lead.id}`);
        events.leadQualified(data);
    }
});

app.post("/leadlost", (req, res) => {
    const data = req.body;
    if (data.Lead != null) {
        res.sendStatus(200);
        console.log(`Lead descartado, id do Lead: ${data.Lead.id}`);
        events.leadLost(data);
    }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))