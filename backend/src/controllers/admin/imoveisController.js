var imovelServices = require("../../services/admin/imovelServices");
const { nanoid } = require('nanoid');

async function register(req, res) {
    console.log("FILES!", req.files);
    console.log("CONSOLE!", req.body);

    if (!req.body) {
        return res.status(400).json({ erro: "Existem dados indefinidos!" })
    } else {
        const dados = req.body
        var dadosFormatados = Object.fromEntries(
            Object.entries(dados).map(([chave, valor]) => {
                var valorFormatado = (typeof valor === 'string') ? valor.trim() : valor
                if (valorFormatado === "false") {
                    return [chave, false]
                } else if (valorFormatado === "true") {
                    return [chave, true]
                } else if (valorFormatado === "" || valorFormatado === undefined || valorFormatado === null) {
                    return [chave, null]
                } else if (!isNaN(valorFormatado)) {
                    return [chave, Number(valorFormatado)]
                } else {
                    return [chave, valorFormatado]
                }
            })
        )

        console.log("Dados formatados:", dadosFormatados.titulo);

        var id_slug = nanoid(5)
        var slug = (`${dadosFormatados.tipo_imovel} ${dadosFormatados.quartos} qtos ${dadosFormatados.bairro} area ${dadosFormatados.area_m2} ${id_slug}`).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');

        dadosFormatados.slug = slug

        const respostaCadastro = await imovelServices.register(dadosFormatados)

        if (!respostaCadastro.data) {
            return res.status(200).json({ erro: "Erro ao cadastrar o imóvel!" })
        }

        const id_imovel = respostaCadastro.data[0].id_imovel
        const fotos = req.files
        for (var i = 0; i < fotos.length; i++) {
            fotos[i].destaque = false
        }
        fotos[dadosFormatados.img_destaque].destaque = true
        return uploadPhotos(fotos, id_imovel, res)
    }
}

async function uploadPhotos(fotos, id_imovel, res) {
    var fotosSubidas = []
    try {
        for (var i = 0; i < fotos.length; i++) {
            const foto_atual = fotos[i]
            const respostaUpload = await imovelServices.uploadPhotos(id_imovel, foto_atual, i)

            console.log(respostaUpload);
            if (respostaUpload.error) {
                throw new Error(`Erro ao subir a foto ${i + 1}: ${respostaUpload.error.message}`)
            }
            fotosSubidas.push(respostaUpload)
        }
        return registerPhotos(id_imovel, fotosSubidas, res)
    } catch (error) {
        console.error("ERRO NO REGISTRO:", error);
        return res.status(500).json({ erro: error.message });
        /*
            CONGELAR ESSE CÓDIGO POR ENQUANTO
              if (urls.length > 0) {
                await imovelServices.deleteFotos(fotosSubidas);
            }
        */
    }
}

async function registerPhotos(id_imovel, arquivos, res) {
    var url_foto_destaque = ""
    try {
        var contador = 0
        for (var i = 0; i < arquivos.length; i++) {
            const arquivo_atual = arquivos[i]
            contador++
            const respostaFotos = await imovelServices.registerPhotos(id_imovel, arquivo_atual, i)
            console.log(respostaFotos);
            if (arquivo_atual.data.arquivo.destaque === true) {
                url_foto_destaque = arquivo_atual.data.fullPath

            }
            if (respostaFotos.error) {
                throw new Error(`Erro ao subir no banco a foto ${i + 1}: ${respostaFotos.error}`)
            }
        }
        if (contador === arquivos.length) {
            return res.status(200).json({ message: "Imóvel e fotos cadastradas com sucesso!" })
        }

    } catch (error) {
        console.error("ERRO NO REGISTRO:", error);
        return res.status(500).json({ erro: error.message });
        /*
            CONGELAR ESSE CÓDIGO POR ENQUANTO
              if (urls.length > 0) {
                await imovelServices.deleteFotos(fotosSubidas);
            }
        */
    }
}

async function buscarImoveis(req, res) {
    const respostaBD = await imovelServices.buscarImoveis()

    console.log("Busca imóveis:", respostaBD);
    for (var i = 0; i < respostaBD.data.length; i++) {
        var imovel = respostaBD.data[i]
        if (imovel.fotos_imovel && imovel.fotos_imovel.length > 0) {
            respostaBD.data[i].fotos_imovel = respostaBD.data[i].fotos_imovel[0].url
        } else {
            console.warn(`Imóvel ID ${imovel.id_imovel} está sem foto de destaque no retorno.`);
            imo
        }
    }

    if (respostaBD.error) {
        console.error("Erro ao buscar imóveis:", respostaBD.error.message);
        return res.status(500).json({ erro: respostaBD.error.message });
    }
    return res.status(200).json({ dados: respostaBD.data });
}

async function atualizarImagem(id_imovel, url) {
    try {
        const respostaUpdate = await imovelServices.atualizarImagem(id_imovel, url)
        console.log(respostaUpdate);
        if (respostaUpdate.error) {
            throw new Error(`Erro ao atualizar a foto: ${respostaUpdate.error} no banco `)
        }
    } catch (error) {
        console.error("ERRO NO REGISTRO:", error);
    }
}
async function detalhesImovel(req, res) {

    var slug = req.params.slug
    console.log("SLUG", slug);
    
    if (!slug) {
        return res.status(400).json({erro: `O slug está undefined.`})
    }
    const respostaDetalhes = await imovelServices.detalhesImovel(slug)

    console.log(respostaDetalhes);
    if (respostaDetalhes.error) {
        return res.status(400).json({erro: `Erro ao atualizar a foto: ${respostaDetalhes.error} no banco `})
    }
    
    return res.status(200).json({dados: respostaDetalhes.data ,message: `Sucesso ao buscar detalhes!`})
}

module.exports = {
    register,
    buscarImoveis,
    detalhesImovel
}