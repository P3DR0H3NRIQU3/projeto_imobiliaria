import styles from "../../styles/RegisterImovel.module.css";
import HeaderAdmin from "../../components/HeaderAdmin";
import { useState, useEffect } from 'react';
import { Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";

export default function RegisterImovel() {
    var navigate = useNavigate()
    const [imagens, setImagens] = useState([]);
    const [escolhido, setEscolhido] = useState("");
    const [ativo, setAtivo] = useState("none");
    const [tamanho, setTamanho] = useState("10vh");

    const [tipoImovel, setTipoImovel] = useState("apartamento");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function checarUsuario() {
            fetch('http://localhost:3333/admin/validar',
                {
                    method: 'GET',
                    credentials: 'include'
                }
            )
                .then(function (response) {
                    if (response.ok) {
                        setLoading(false);
                    } else {
                        navigate('/login')
                        alert("TÁ ERRADO PAE")
                    }
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        navigate('/login')
                        alert("TÁ ERRADO PAE")
                    }
                });
        }
        checarUsuario()
    }, []);
    if (loading) {
        return <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}><h1>Validando suas credenciais...</h1></div>
    }


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
        if(!urls){
            return alert("Erro ao carregar imagens!")
        }
        
        setAtivo("flex")
        setTamanho("50vh")
        setImagens(urls)
    }

    return (
        <main className={styles.register_imovel}>
            <HeaderAdmin />
            <div className={styles.container}>
                <div className={styles.form_register}>
                    <p className={styles.txt_register}>Informações do imóvel</p>
                    <div className={styles.cont_checkbox}>
                        <div className={styles.radio}>
                            <p className={styles.desc_register}>Apartamento</p>
                            <input type="radio" onChange={() => setTipoImovel("apartamento")} name="tipo_imovel" id="radio_apartamento" />
                        </div>
                        <div className={styles.radio}>
                            <p className={styles.desc_register}>Casa</p>
                            <input type="radio" onChange={() => setTipoImovel("casa")} name="tipo_imovel" id="radio_casa" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <p className={styles.txt_input}>Título do anúncio</p>
                        <input type="text" className={styles.inputs_register} placeholder="Insira o titulo do anúncio:" name="input_titulo" id="inp_titulo" />
                    </div>
                    <div className={styles.cont_inputs}>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Quantidade de quartos</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira a quantidade de quartos:" name="input_quartos" id="inp_quartos" />
                        </div>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Quantidade de suítes</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira a quantidade de suites:" name="input_suites" id="inp_suites" />
                        </div>
                    </div>
                    <div className={styles.cont_inputs}>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Quantidade de banheiros</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira a quantidade de banheiros:" name="input_banheiros" id="inp_banheiros" />
                        </div>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Quantidade de garagem</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira a quantidade de garagem:" name="input_garagem" id="inp_garagem" />
                        </div>
                    </div>
                    <div className={styles.cont_inputs}>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Área total em m²</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira a area total:" name="input_areattl" id="inp_areattl" />
                        </div>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Área construída em m²</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira a area construida:" name="input_areactd" id="inp_areactd" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <p className={styles.txt_input}>Valor do imóvel em R$</p>
                        <input type="text" className={styles.inputs_register} placeholder="Insira o valor do imóvel:" name="input_valor" id="inp_valor" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Aceita financiamento</p>
                        <input type="checkbox" name="financiamento" id="check_financiamento" />
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Aceita FGTS</p>
                        <input type="checkbox" name="fgts" id="check_fgts" />
                    </div>
                    <div className={styles.input}>
                        <p className={styles.txt_input}>Rua</p>
                        <input type="text" className={styles.inputs_register} placeholder="Insira a rua:" name="input_rua" id="inp_rua" />
                    </div>
                    <div className={styles.cont_inputs}>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Número</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira o numero:" name="input_numero" id="inp_numero" />
                        </div>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>CEP</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira o cep:" name="input_cep" id="inp_cep" />
                        </div>
                    </div>
                    <div className={styles.cont_inputs}>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Bairro</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira o bairro:" name="input_bairro" id="inp_bairro" />
                        </div>
                        <div className={styles.input}>
                            <p className={styles.txt_input}>Cidade</p>
                            <input type="text" className={styles.inputs_register} placeholder="Insira a cidade:" name="input_cidade" id="inp_cidade" />
                        </div>
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Perto da estação</p>
                        <input type="checkbox" name="estacao" id="check_estacao" />
                    </div>
                    {tipoImovel === "apartamento" &&
                        <div className={styles.cont_inputs}>
                            <div className={styles.input}>
                                <p className={styles.txt_input}>Andar</p>
                                <input type="text" className={styles.inputs_register} placeholder="Insira o andar:" name="input_andar" id="inp_andar" />
                            </div>
                            <div className={styles.input}>
                                <p className={styles.txt_input}>Valor do condomínio</p>
                                <input type="text" className={styles.inputs_register} placeholder="Insira o valor do condominio:" name="input_condominio" id="inp_condominio" />
                            </div>
                        </div>
                    }
                    <div className={styles.check}>
                        <p className={styles.desc_register}>Possui elevador</p>
                        <input type="checkbox" name="elevador" id="check_elevador" />
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
                        <p className={styles.desc_register}>Status do imóvel</p>
                        <select name="status" id="select_status">
                            <option value="disponivel">Disponível</option>
                            <option value="indisponivel">Indisponível</option>
                        </select>
                    </div>
                    <div className={styles.check}>
                        <p className={styles.desc_register}>É destaque</p>
                        <input type="checkbox" name="destaque" id="check_destaque" />
                    </div>

                    <div className={styles.input} id={styles.descricao}>
                        <p className={styles.desc_register}>Descrição do imóvel</p>
                        <input type="text" className={styles.inputs_register} placeholder="Insira a descrição:" name="input_descricao" id={styles.input_descricao} />
                    </div>

                    <div className={styles.cont_imgs} style={{height: tamanho}} id="cont_imgs">
                        <p className={styles.desc_register}>Imagens/fotos</p>
                        <div className={styles.cont_image} style={{display: ativo}}>
                            <Swiper navigation slidesPerView={2}>
                                {imagens.map(imagem => (
                                    <SwiperSlide>
                                        <div className={styles.card}>
                                            <p className={styles.txt_ordem}>{imagem[0]}</p>
                                            <img className={styles.img} src={imagem[1]} alt="" />
                                            <input type="radio" onChange={e => setEscolhido(e.target.value)} value={imagem[0]} name="inp_img" id="" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <input type="file" onChange={(e) => listarImagens(e)} accept="image/*" multiple name="input_descricao" id="input_descricao" />
                    </div>

                    <button className={styles.btn_cadastrar}>Cadastrar</button>

                </div>
            </div>

        </main >
    )

}