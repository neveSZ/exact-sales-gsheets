require('dotenv/config');
const googleSheet = require('./sheets');

function leadInserted(data){
    var origem=null;
    var subOrigem=null;
    var mercado=null;
    var dtCriacao = new Date(data.Lead.DtCadastro);
    dtCriacao = dtCriacao.getDate() + '/' + (dtCriacao.getMonth()+1) + '/' + dtCriacao.getFullYear();
    

    // Verificar se existe
    if(data.Lead.SubOrigem != null)
        subOrigem=data.Lead.SubOrigem.value;

    if(data.Lead.Origem != null)
        origem=data.Lead.Origem.value;

    if(data.Lead.Mercado != null)
        mercado=data.Lead.Mercado.value;


    const row = {
        leadId: data.Lead.id,
        linkLead: data.Lead.LinkPublico,
        nomeEmpresa: data.Lead.Empresa,
        origem: origem,
        subOrigem: subOrigem,
        mercado: mercado,
        outroSegmento: 0, //to-do campo personalizado
        linkMarketing: data.Lead.LinkMkt,
        prevendedorNome: data.Lead.PreVendedor.Nome,
        prevendedorEmail: data.Lead.PreVendedor.Email,
        dataCriacao: dtCriacao
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