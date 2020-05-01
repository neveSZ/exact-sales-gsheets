require('dotenv/config');
const googleSheet = require('./sheets');

function checkOutros(arrayCampos) {
    for (var i = 0; i < arrayCampos.length; i++) {
        if (arrayCampos[i].id == "_seoutros")
            return arrayCampos[i].value;
    }
    return null;
}

function dateDiff(data1, data2) {
    var dataA = new Date(data1);
    var dataB = new Date(data2);
    return parseInt((dataA - dataB) / (1000 * 60 * 60 * 24)) + 1
}

function dateFormat(data) {
    var dt = new Date(data);
    return dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
}

function leadInserted(data) {
    var origem = null;
    var subOrigem = null;
    var mercado = null;

    if (data.Lead.SubOrigem != null)
        subOrigem = data.Lead.SubOrigem.value;

    if (data.Lead.Origem != null)
        origem = data.Lead.Origem.value;

    if (data.Lead.Mercado != null)
        mercado = data.Lead.Mercado.value;

    const row = {
        leadId: data.Lead.id,
        linkLead: data.Lead.LinkPublico,
        nomeEmpresa: data.Lead.Empresa,
        origem: origem,
        subOrigem: subOrigem,
        mercado: mercado,
        linkMarketing: data.Lead.LinkMkt,
        prevendedorNome: data.Lead.PreVendedor.Nome,
        prevendedorEmail: data.Lead.PreVendedor.Email,
        dataCriacao: dateFormat(data.Lead.DtCadastro)
    }
    googleSheet.add(process.env.GOOGLE_WORKSHEET_NEW, row);
}

function schedule(data) {
    var origem = null;
    var subOrigem = null;
    var mercado = null;


    if (data.Lead.SubOrigem != null)
        subOrigem = data.Lead.SubOrigem.value;

    if (data.Lead.Origem != null)
        origem = data.Lead.Origem.value;

    if (data.Lead.Mercado != null)
        mercado = data.Lead.Mercado.value;


    const row = {
        leadId: data.Lead.id,
        linkLead: data.Lead.LinkPublico,
        nomeEmpresa: data.Lead.Empresa,
        origem: origem,
        subOrigem: subOrigem,
        mercado: mercado,
        outros: checkOutros(data.Lead.CamposPersonalizados),
        linkMarketing: data.Lead.LinkMkt,
        prevendedorNome: data.Lead.PreVendedor.Nome,
        prevendedorEmail: data.Lead.PreVendedor.Email,
        vendedorNome: data.Lead.Vendedor.Nome,
        vendedorEmail: data.Lead.Vendedor.Email,
        dataCriacao: dateFormat(data.Lead.DtCadastro),
        dataFiltro1: dateFormat(data.Lead.Etapas[0].DtAvaliacao),
        dataFiltro2: dateFormat(data.Lead.Etapas[1].DtAvaliacao),
        dataAgendamento: dateFormat(data.Lead.DtAtualizacao),
        dataReuniao: dateFormat(data.Agendamento.DtInicio),
        tempoFiltro1: dateDiff(data.Lead.Etapas[1].DtAvaliacao, data.Lead.Etapas[0].DtAvaliacao),
        tempoFiltro2: dateDiff(data.Lead.DtAtualizacao, data.Lead.Etapas[1].DtAvaliacao),
        tempoTotal: dateDiff(data.Lead.DtAtualizacao, data.Lead.DtCadastro),
        tempoAteReuniao: dateDiff(data.Agendamento.DtInicio, data.Lead.DtAtualizacao)
    }
    googleSheet.add(process.env.GOOGLE_WORKSHEET_SCHEDULE, row);
}

function leadQualified(data) {
    var origem = null;
    var subOrigem = null;
    var mercado = null;


    if (data.Lead.SubOrigem != null)
        subOrigem = data.Lead.SubOrigem.value;

    if (data.Lead.Origem != null)
        origem = data.Lead.Origem.value;

    if (data.Lead.Mercado != null)
        mercado = data.Lead.Mercado.value;

    const row = {
        leadId: data.Lead.id,
        linkLead: data.Lead.LinkPublico,
        nomeEmpresa: data.Lead.Empresa,
        origem: origem,
        subOrigem: subOrigem,
        mercado: mercado,
        outros: checkOutros(data.Lead.CamposPersonalizados),
        linkMarketing: data.Lead.LinkMkt,
        prevendedorNome: data.Lead.PreVendedor.Nome,
        prevendedorEmail: data.Lead.PreVendedor.Email,
        vendedorNome: data.Lead.Vendedor.Nome,
        vendedorEmail: data.Lead.Vendedor.Email,
        qualificacaoFiltro2: data.Lead.Etapas[1].Qualificacao,
        dataCriacao: dateFormat(data.Lead.DtCadastro),
        dataFiltro2: dateFormat(data.Lead.Etapas[1].DtAvaliacao),
        dataReuniao: dateFormat(data.Agendamento.DtInicio),
        dataFeedback: dateFormat(data.Lead.DtAtualizacao),
        tempoFeedback: dateDiff(data.Lead.DtAtualizacao, data.Agendamento.DtInicio)
    }
    googleSheet.add(process.env.GOOGLE_WORKSHEET_QUALIFIED, row);
}

function leadLost(data) {
    var origem = null;
    var subOrigem = null;
    var mercado = null;
    var vendedor = { Nome: null, Email: null };
    var etpAnterior = null;


    if (data.Lead.SubOrigem != null)
        subOrigem = data.Lead.SubOrigem.value;

    if (data.Lead.Origem != null)
        origem = data.Lead.Origem.value;

    if (data.Lead.Mercado != null)
        mercado = data.Lead.Mercado.value;

    if (data.Lead.Vendedor != null)
        vendedor = data.Lead.Vendedor;

    if (data.Lead.Etapas[data.Lead.Etapas] != null)
        etpAnterior = data.Lead.Etapas[data.Lead.Etapas.length - 1].Etapa;

    const row = {
        leadId: data.Lead.id,
        linkLead: data.Lead.LinkPublico,
        nomeEmpresa: data.Lead.Empresa,
        origem: origem,
        subOrigem: subOrigem,
        mercado: mercado,
        outros: checkOutros(data.Lead.CamposPersonalizados),
        linkMarketing: data.Lead.LinkMkt,
        prevendedorNome: data.Lead.PreVendedor.Nome,
        prevendedorEmail: data.Lead.PreVendedor.Email,
        vendedorNome: vendedor.Nome,
        vendedorEmail: vendedor.Email,
        dataCriacao: dateFormat(data.Lead.DtCadastro),
        dataDescarte: dateFormat(data.Lead.DtAtualizacao),
        etapaAnterior: etpAnterior,
        motivoDescarte: data.Lead.MotivoDescarte,
        tempoDescarte: dateDiff(data.Lead.DtAtualizacao, data.Lead.DtCadastro)
    }
    googleSheet.add(process.env.GOOGLE_WORKSHEET_LOST, row);
}

exports.leadInserted = leadInserted;
exports.schedule = schedule;
exports.leadQualified = leadQualified;
exports.leadLost = leadLost;