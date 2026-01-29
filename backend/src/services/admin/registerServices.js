var supabase = require("../../lib/supabase");
const path = require('path');
async function register(dados) {
    console.log("Dados no services:", dados);
    const respostaBD = await supabase
        .from('imovel')
        .insert([{
            tipo_imovel: dados.tipo_imovel,
            titulo: dados.titulo,
            quartos: dados.quartos,
            suites: dados.suites,
            banheiros: dados.banheiros,
            vagas_garagem: dados.vagas_garagem,
            area_m2: dados.area_m2,
            valor_imovel: dados.valor_imovel,
            aceita_financiamento: dados.aceita_financiamento,
            aceita_fgts: dados.aceita_fgts,
            rua: dados.rua,
            numero: dados.numero,
            cep: dados.cep,
            bairro: dados.bairro,
            cidade: dados.cidade,
            perto_estacao: dados.perto_estacao,
            andar: dados.andar,
            valor_condominio: dados.valor_condominio,
            possui_elevador: dados.possui_elevador,
            churrasqueira: dados.churrasqueira,
            area_gourmet: dados.area_gourmet,
            ar_condicionado: dados.ar_condicionado,
            academia: dados.academia,
            area_lazer: dados.area_lazer,
            status: dados.status,
            destaque: dados.destaque,
            descricao: dados.descricao,
            varanda: dados.varanda,
            salao_festas: dados.salao_festas,
            portaria_24h: dados.portaria_24h,
            mobiliado: dados.mobiliado,
            escritura: dados.escritura,
            iptu_pago: dados.iptu_pago,
            slug: dados.slug
        }])
        .select("id_imovel")
    return respostaBD
}


async function uploadFotos(id_imovel, arquivo, indice_foto) {
    console.log("Fotos no service:", arquivo);
    const tempoAtual = Date.now()
    const caminho = `${id_imovel}/${tempoAtual}/foto_${indice_foto}`

    const respostaUpload = await supabase.storage.from(`fotos_imoveis`).upload(caminho, arquivo.buffer, {
        contentType: arquivo.mimetype,
    })

    respostaUpload.data.arquivo = arquivo
    return respostaUpload

}
module.exports = {
    register,
    uploadFotos
};
