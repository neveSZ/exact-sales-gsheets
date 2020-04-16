require('dotenv/config');
const googleSheet = require('./sheets');

function leadInserted(data){
    const row = {
        leadId: data.Lead.id,
        linkLead: `https://app.exactsales.com.br/spotter/detalhes-lead/${data.Lead.id}`,
        nomeEmpresa: data.Lead.Empresa,
        origem: data.Lead.Origem.value,
        subOrigem: data.Lead.SubOrigem.value,
        mercado: data.Lead.Mercado.value,
        outroSegmento: 0, //to-do campo personalizado
        linkMarketing: data.Lead.LinkMkt,
        prevendedorNome: data.Lead.PreVendedor.Nome,
        prevendedorEmail: data.Lead.PreVendedor.Email,
        dataCriacao: data.Lead.DtCadastro
    }
    googleSheet.add(process.env.GOOGLE_WORKSHEET_NEW, row);
}

function schedule(data){
    console.log(data);
}

function leadQualified(data){
    console.log(data);
}

function leadLost(data){
    console.log(data);
}

exports.leadInserted = leadInserted;
exports.schedule = schedule;
exports.leadQualified = leadQualified;
exports.leadLost = leadLost;