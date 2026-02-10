import styles from "../../styles/RegisterImovel.module.css";
import HeaderAdmin from "../../components/HeaderAdmin";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
export default function RegisterImovel() {
    var navigate = useNavigate()
    const [imagens, setImagens] = useState([]);
    const [escolhido, setEscolhido] = useState("");
    const [ativo, setAtivo] = useState("none");
    const [tamanho, setTamanho] = useState("10vh");
    const [modal, setModal] = useState(false);

    const [tipoImovel, setTipoImovel] = useState("apartamento");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function checarUsuario() {
            try {
                const response = await fetch('http://localhost:3333/admin/validar',
                    {
                        method: 'GET',
                        credentials: 'include'
                    }
                )
                console.log("Status recebido:", response.status);
                if (response.ok) {
                    setLoading(false);
                }
                else {
                    console.warn("Token inválido, redirecionando...");
                    return navigate('/login')
                }

            } catch (error) {
                console.error("Erro na requisição:", error);
                navigate('/login')
            }
        }
        checarUsuario()
    }, []);
    if (loading) {
        return <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}><h1>Validando suas credenciais...</h1></div>
    }



    return (
        <main className={styles.register_imovel}>
            <HeaderAdmin />
            <div className={styles.container}>
                {modal === true &&
                    <ModalLogout mensagem="O tempo da sua sessão expirou! Aguarde enquanto te redirecionamos ao login!" icon="timer" />
                }
                <form action="" onSubmit={processarCampos} className={styles.form_register}>
                    <p className={styles.txt_register}>Informações do imóvel</p>
                    <p>Tipo imóvel <span className={styles.span_asterisco}>*</span></p>
                    <div className={styles.cont_checkbox}>
                        <div className={styles.radio}>
                            <p className={styles.desc_register}>Apartamento</p>
                            <input type="radio" onChange={() => setTipoImovel("apartamento")} name="tipo_imovel" value={"apartamento"} required id="radio_apartamento" />
                        </div>
                        <div className={styles.radio}>
                            <p className={styles.desc_register}>Casa</p>
                            <input type="radio" onChange={() => setTipoImovel("casa")} name="tipo_imovel" value={"casa"} required id="radio_casa" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <p className={styles.txt_input}>Título do anúncio <span className={styles.span_asterisco}>*</span></p>
                        <input type="text" minLength={5} className={styles.inputs_register} placeholder="Insira o titulo do anúncio:" required name="titulo" id="inp_titulo" />
                    </div>
                    <div className={styles.cont_inputs}>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Quantidade de quartos <span className={styles.span_asterisco}>*</span></p>
                            <input type="number" min={0} className={styles.inputs_register} placeholder="Insira a quantidade de quartos:" required name="quartos" id="inp_quartos" />
                        </div>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Quantidade de suítes</p>
                            <input type="number" min={0} className={styles.inputs_register} placeholder="Insira a quantidade de suites:" name="suites" id="inp_suites" />
                        </div>
                    </div>
                    <div className={styles.cont_inputs}>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Quantidade de banheiros <span className={styles.span_asterisco}>*</span></p>
                            <input type="number" min={0} className={styles.inputs_register} required placeholder="Insira a quantidade de banheiros:" name="banheiros" id="inp_banheiros" />
                        </div>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Quantidade de garagem</p>
                            <input type="number" min={0} className={styles.inputs_register} placeholder="Insira a quantidade de garagem:" name="vagas_garagem" id="inp_garagem" />
                        </div>
                    </div>
                    <div className={styles.cont_inputs}>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Área total em m² <span className={styles.span_asterisco}>*</span></p>
                            <input type="number" min={0} className={styles.inputs_register} required placeholder="Insira a area total:" name="area_m2" id="inp_areattl" />
                        </div>
                        {tipoImovel === "casa" &&
                            <div className={styles.input}>
                                <p className={styles.txt_input}>Área construída em m²</p>
                                <input type="number" min={0} className={styles.inputs_register} placeholder="Insira a area construida:" name="area_construida" id="inp_areactd" />
                            </div>
                        }
                    </div>
                    <div className={styles.input}>
                        <p className={styles.txt_input}>Valor do imóvel em R$ <span className={styles.span_asterisco}>*</span></p>
                        <input type="number" min={0} className={styles.inputs_register} required placeholder="Insira o valor do imóvel:" name="valor_imovel" id="inp_valor" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Aceita financiamento</p>
                        <input type="checkbox" name="aceita_financiamento" id="check_financiamento" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Aceita FGTS</p>
                        <input type="checkbox" name="aceita_fgts" id="check_fgts" />
                    </div>
                    <div className={styles.input}>
                        <p className={styles.txt_input}>Rua <span className={styles.span_asterisco}>*</span></p>
                        <input type="text" className={styles.inputs_register} required placeholder="Insira a rua:" name="rua" id="inp_rua" />
                    </div>
                    <div className={styles.cont_inputs}>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Número</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira o numero:" name="numero" id="inp_numero" />
                        </div>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>CEP</p>
                            <input type="text" maxLength={8} className={styles.inputs_register} placeholder="Insira o cep:" name="cep" id="inp_cep" />
                        </div>
                    </div>
                    <div className={styles.cont_inputs}>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Bairro <span className={styles.span_asterisco}>*</span></p>
                            <input type="text" className={styles.inputs_register} required placeholder="Insira o bairro:" name="bairro" id="inp_bairro" />
                        </div>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Cidade <span className={styles.span_asterisco}>*</span></p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira a cidade:" name="cidade" id="inp_cidade" />
                        </div>
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Perto da estação</p>
                        <input type="checkbox" name="perto_estacao" id="check_estacao" />
                    </div>
                    {tipoImovel === "apartamento" &&
                        <div className={styles.cont_inputs}>
                            <div className={styles.input}>
                                <p className={styles.txt_input}>Andar</p>
                                <input type="text" className={styles.inputs_register} placeholder="Insira o andar:" name="andar" id="inp_andar" />
                            </div>
                            <div className={styles.input}>
                                <p className={styles.txt_input}>Valor do condomínio <span className={styles.span_asterisco}>*</span></p>
                                <input type="text" className={styles.inputs_register} required placeholder="Insira o valor do condominio:" name="valor_condominio" id="inp_condominio" />
                            </div>
                        </div>
                    }
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Possui elevador</p>
                        <input type="checkbox" name="possui_elevador" id="check_elevador" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Churrasqueira</p>
                        <input type="checkbox" name="churrasqueira" id="check_churrasqueira" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Área gourmet</p>
                        <input type="checkbox" name="area_gourmet" id="check_area_gourmet" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Varanda</p>
                        <input type="checkbox" name="varanda" id="check_varanda" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Ar condicionado</p>
                        <input type="checkbox" name="ar_condicionado" id="check_ar_condicionado" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Academia</p>
                        <input type="checkbox" name="academia" id="check_academia" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Salão de festas</p>
                        <input type="checkbox" name="salao_festas" id="check_salao_festas" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Área de lazer</p>
                        <input type="checkbox" name="area_lazer" id="check_area_lazer" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Portaria 24h</p>
                        <input type="checkbox" name="portaria_24h" id="check_portaria_24h" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Mobiliado</p>
                        <input type="checkbox" name="mobiliado" id="check_mobiliado" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Tem escritura</p>
                        <input type="checkbox" name="escritura" id="check_escritura" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>IPTU em dia</p>
                        <input type="checkbox" name="iptu_pago" id="check_iptu_pago" />
                    </div>
                    <div className={styles.select}>
                        <p className={styles.desc_register}>Status do imóvel <span className={styles.span_asterisco}>*</span></p>
                        <select required name="status" id="select_status">
                            <option value="disponivel">Disponível</option>
                            <option value="indisponivel">Indisponível</option>
                        </select>
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>É destaque</p>
                        <input type="checkbox" name="destaque" id="check_destaque" />
                    </div>

                    <div className={styles.input} id={styles.descricao}>
                        <p className={styles.desc_register}>Descrição do imóvel <span className={styles.span_asterisco}>*</span></p>
                        <input type="text" required className={styles.inputs_register} placeholder="Insira a descrição:" name="descricao" id={styles.input_descricao} />
                    </div>

                    <div className={styles.cont_imgs} style={{ height: tamanho }} id="cont_imgs">
                        <p className={styles.desc_register}>Imagens/fotos <span className={styles.span_asterisco}>*</span></p>
                        <p className={styles.txt_selecione} style={{ display: ativo }}>Selecione a foto destaque: <span className={styles.span_asterisco}>*</span></p>
                        <div className={styles.cont_image} style={{ display: ativo }}>
                            <Swiper slidesPerView={"auto"} spaceBetween={30}>
                                {imagens.map(imagem => (
                                    <SwiperSlide className={styles.swipper_slide}>
                                        <div className={styles.card}>
                                            <p className={styles.txt_ordem}>{imagem[0]}</p>
                                            <img className={styles.img} src={imagem[1]} alt="" />
                                            <input type="radio" required onChange={e => setEscolhido(e.target.value)} value={imagem[0] - 1} name="img_destaque" id="" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <input type="file" required onChange={(e) => listarImagens(e)} accept="image/*" multiple name="imagens_imovel" id="input_imagens" />
                    </div>
                    <button className={styles.btn_cadastrar} type="submit">Cadastrar</button>
                </form>
                
            </div>
        </main >
    )




    function listarImagens(evento) {
        var arquivos = evento.target.files
        console.log("arquivos", arquivos);
        arquivos = Array.from(arquivos)
        var urls = []
        for (var i = 0; i < arquivos.length; i++) {
            var arquivoAtual = arquivos[i];
            var cont = i + 1
            urls.push([cont, URL.createObjectURL(arquivoAtual)])
        }
        console.log("imgs", urls);
        if (!urls) {
            return alert("Erro ao carregar imagens!")
        }

        setAtivo("flex")
        setTamanho("50vh")
        setImagens(urls)
    }

    function processarCampos(evento) {
        evento.preventDefault()
        console.log(evento.target);
        const dadosForm = new FormData(evento.target)

        const checkBoxes = [
            "aceita_financiamento",
            "aceita_fgts",
            "perto_estacao",
            "possui_elevador",
            "churrasqueira",
            "area_gourmet",
            "varanda",
            "ar_condicionado",
            "academia",
            "salao_festas",
            "area_lazer",
            "portaria_24h",
            "mobiliado",
            "escritura",
            "iptu_pago",
            "destaque",
        ]
        checkBoxes.forEach(check => {
            if (!dadosForm.has(check)) {
                dadosForm.append(check, "false")
            } else {
                dadosForm.set(check, "true")
            }
        });

        const listaImagens = dadosForm.getAll("imagens_imovel")

        listaImagens.forEach(img => {
            dadosForm.append("fotos", img)
        });

        dadosForm.delete('imagens_imovel')

        console.log(Object.fromEntries(dadosForm.entries('')));
        console.log(dadosForm.getAll('fotos'));

        cadastrarImovel(dadosForm)

    }
    async function cadastrarImovel(dados) {
        try {
            var response = await fetch('http://localhost:3333/admin/register', {
                method: 'POST',
                credentials: 'include',
                body: dados
            })
            
            console.log(response);
            
            const resultado = await response.json();
            console.log(resultado);

            if (response.ok) {
                alert(resultado.message)
                navigate("/admin")
            } else{
                throw new Error(`Erro ao cadastrar imóvel! ${resultado.erro}`)
            }
            
            
        } catch (error) {
            console.log("ERRO!", error);
            alert(error.message)
        }
    }

}