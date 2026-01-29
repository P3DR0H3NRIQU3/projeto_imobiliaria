var registerServices = require("../../services/admin/registerServices");


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

        var slug = dadosFormatados.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, '-');

        dadosFormatados.slug = slug

        const respostaCadastro = await registerServices.register(dadosFormatados)

        if (!respostaCadastro.data) {
            return res.status(200).json({ erro: "Erro ao cadastrar o imóvel!" })
        }

        const id_imovel = respostaCadastro.data[0].id_imovel
        const fotos = req.files
        fotos[dadosFormatados.img_destaque].destaque = true

        uploadFotos(fotos, id_imovel)
    }
}

async function uploadFotos(fotos, id_imovel) {
    var urls = []
    try {
        for (var i = 0; i < fotos.length; i++) {
            const foto_atual = fotos[i]
            const respostaUpload = await registerServices.uploadFotos(id_imovel, foto_atual, i)

            console.log(respostaUpload);
            if (respostaUpload.error) {
                throw new Error(`Erro ao subir a foto ${i + 1}: ${respostaUpload.error.message}`)
            }
            urls.push(respostaUpload.fullPath)
        }
    } catch (error) {
        console.error("ERRO NO REGISTRO:", error);
        /*
            CONGELAR ESSE CÓDIGO POR ENQUANTO
              if (urls.length > 0) {
                await registerServices.deleteFotos(fotosSubidas);
            }
        */
        return res.status(500).json({ erro: error.message });
    }
}
module.exports = {
    register
};
