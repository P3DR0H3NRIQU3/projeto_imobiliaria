var supabase = require("../../lib/supabase");
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

async function uploadPhotos(id_imovel, arquivo, indice_foto) {
    console.log("Fotos no service:", arquivo);
    const caminho = `${id_imovel}/foto_${indice_foto}`

    const respostaUpload = await supabase.storage.from(`fotos_imoveis`).upload(caminho, arquivo.buffer, {
        contentType: arquivo.mimetype,
    })

    respostaUpload.data.arquivo = arquivo
    return respostaUpload
}

async function registerPhotos(id_imovel, arquivo, indice) {
    console.log("Register no service:", arquivo);

    const respostaPhotos = await supabase
        .from(`fotos_imovel`)
        .insert([{
            imovel_id: id_imovel,
            url: arquivo.data.fullPath,
            ordem_foto: indice,
            destaque: arquivo.data.arquivo.destaque
        }])

    return respostaPhotos
}

async function deletarFotos(url) {
    console.log("DELETAR no service:", url);

    const respostaUpload = await supabase.storage.from(`fotos_imoveis`).remove(url)
    return respostaUpload
}

async function buscarImoveis() {
    const respostaBuscar = await supabase.from(`imovel`)
        .select("id_imovel, titulo, valor_imovel, rua, numero, bairro, slug, destaque, fotos_imovel!inner(url)")
        .eq("fotos_imovel.destaque", true)
        .order('created_at', { ascending: false });
    return respostaBuscar
}

async function atualizarImagem(id_imovel, url) {
    const respostaUpdate = await supabase
        .from(`fotos_imovel`)
        .update({ img_destaque: url })
        .eq("imovel_id", id_imovel)
    return respostaUpdate
}

async function detalhesImovel(slug) {
    const respostaSelect = await supabase
        .from(`imovel`)
        .select(`
            *,
            fotos_imovel(*)
        `)
        .eq("slug", slug)
        .order('ordem_foto', { foreignTable: 'fotos_imovel', ascending: true })
        .order("destaque", { foreignTable: 'fotos_imovel', ascending: false })
        .single();

    return respostaSelect
}

async function alterar(id_imovel, campo, valor) {
    const respostaUpdate = await supabase
        .from(`imovel`)
        .update({ [campo]: valor })
        .eq("id_imovel", id_imovel)

    return respostaUpdate
}
async function excluir(id_imovel) {
    const deletandoImagensBd = await supabase
        .from(`fotos_imovel`)
        .delete()
        .eq("imovel_id", id_imovel)

    console.log("Resposta excluindo do bd", deletandoImagensBd);

    const listarImagensStorage = await supabase
        .storage
        .from('fotos_imoveis')
        .list(id_imovel)

    console.log("listarImagensStorage: ", listarImagensStorage);
    
    const caminhos = listarImagensStorage.data.map(arquivo => `${id_imovel}/${arquivo.name}`)
    
    console.log("caminhos: ", caminhos);

    const deletandoImagensStorage = await supabase.storage
        .from(`fotos_imoveis`)
        .remove(caminhos)

    console.log("Resposta excluindo do storage", deletandoImagensStorage);

    const respostaDelete = await supabase
        .from(`imovel`)
        .delete()
        .eq("id_imovel", id_imovel)
    return respostaDelete
}

module.exports = {
    register,
    uploadPhotos,
    registerPhotos,
    atualizarImagem,
    buscarImoveis,
    detalhesImovel,
    alterar,
    excluir
};
