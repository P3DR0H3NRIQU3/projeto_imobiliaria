import HeaderAdmin from "../../components/HeaderAdmin";
import Footer from "../../components/Footer";
import styles from "../../styles/ImovelAdmin.module.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EyeIcon, TrashIcon, BedDoubleIcon, BathIcon, RulerDimensionLineIcon, HouseHeart, LucideMapPinHouse, ArrowRightIcon, ShareIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Modal from "../../components/Modal";



export default function ImovelAdmin() {
    const params = useParams()
    var navigate = useNavigate()
    var [imovel, setImovel] = useState({});
    var [urlEndereco, setUrlEndereco] = useState("");
    var [infosPopUp, setInfosPopUp] = useState({})
    var [infoModal, setInfoModal] = useState({})
    var [display, setDisplay] = useState("none")

    async function buscarDados() {
        console.log(params.slug)
        var slug = params.slug.replace("slug=", "")
        console.log(slug)
        const respostaBD = await fetch(`http://localhost:3333/admin/imovel/${slug}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        )
        console.log("Dados recebido:", respostaBD);
        if (respostaBD.ok) {
            const respostaBDJson = await respostaBD.json()
            console.log("respostaBDJson", respostaBDJson);
            setImovel(respostaBDJson.dados)

            var enderecoCompleto = `${respostaBDJson.dados.rua}, ${respostaBDJson.dados.bairro}, ${respostaBDJson.dados.cidade}`;
            setUrlEndereco(enderecoCompleto)
        }
        else {
            console.log("ERRO")
            navigate("/login")
        }
    }


    function desativarPopUp() {
        setInfosPopUp({})
    }


    async function alterarImovel(id_imovel, campo, novo_valor) {
        novo_valor = novo_valor.toLowerCase()
        const respostaBD = await fetch(`http://localhost:3333/admin/imovel/alterar`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    id_imovel: id_imovel,
                    campo: campo,
                    valor: novo_valor
                })
            }
        )
        console.log("Dados recebido:", respostaBD);
        const respostaBDJson = await respostaBD.json()
        desativarPopUp()
        if (respostaBD.ok) {
            console.log("respostaBDJson", respostaBDJson);
            setInfoModal({
                tipo: "ok",
                campo: campo,
                valor: novo_valor,
                mensagem: respostaBDJson.message
            })
            buscarDados()
        } else {
            setInfoModal({
                tipo: "error",
                campo: campo,
                valor: novo_valor,
                mensagem: respostaBDJson.erro
            })

        }
        setDisplay("flex")
        setTimeout(() => {
            setDisplay("none")

        }, 3000);
    }
    async function excluirImovel(id_imovel) {
        const respostaBD = await fetch(`http://localhost:3333/admin/imovel/excluir`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    id_imovel: id_imovel
                })
            }
        )
        console.log("Dados recebidos:", respostaBD);
        const respostaBDJson = await respostaBD.json()
        desativarPopUp()
        if (respostaBD.ok) {
            navigate("/admin")
            console.log("respostaBDJson", respostaBDJson);
            setInfoModal({
                tipo: "ok",
                mensagem: respostaBDJson.message
            })
        } else {
            setInfoModal({
                tipo: "error",
                mensagem: respostaBDJson.erro
            })
        }
        setDisplay("flex")
    }
    useEffect(() => {
        buscarDados()
    }, []);

    function checarValorStatus(status) {
        if (status === "disponivel") {
            return "Indisponivel"
        } else {
            return "Disponivel"
        }
    }
    return (
        <div className={styles.imovel}>
            <HeaderAdmin />

            {Object.keys(infoModal).length > 0 && infoModal.tipo === "error" ?
                <Modal display={display} tipo="error" mensagem={infoModal.mensagem} />
                :
                <Modal display={display} tipo="ok" mensagem={infoModal.mensagem} />
            }
            {Object.keys(infosPopUp).length > 0 &&
                <div className={styles.cont_aviso} onClick={e => { desativarPopUp }}>
                    <div className={styles.pop_up_aviso}>
                        {infosPopUp.campo === "imovel" ?
                            <div className={styles.cont_infos}>
                                <p className={styles.txt_aviso}>Confirmar a exclusão do {infosPopUp.campo}?</p>
                                <p className={styles.campo_aviso}>Esse registro não existirá nunca mais, inclusive fotos, informações etc...</p>
                            </div>
                            :
                            <div className={styles.cont_infos}>
                                <p className={styles.txt_aviso}>Confirmar a edição do campo {infosPopUp.campo}?</p>
                                <p className={styles.campo_aviso}>{infosPopUp.campo}: {infosPopUp.valor()} </p>
                            </div>
                        }
                        <div className={styles.cont_btns}>
                            <button className={styles.btn_aviso} id={styles.btn_cancelar} onClick={e => (desativarPopUp())}>Cancelar</button>
                            <button className={styles.btn_aviso} id={styles.btn_confirmar} onClick={infosPopUp.onConfirm}>Confirmar</button>
                        </div>
                    </div>
                </div>
            }
            {Object.keys(imovel).length > 0 &&
                <div className={styles.container}>

                    <div className={styles.cont_btns}>
                        <button className={styles.btn_banner} onClick={e => (setInfosPopUp({ campo: "imovel", tipo: "excluir", valor: 0, onConfirm: e => { excluirImovel(imovel.id_imovel) } }))}>
                            <p className={styles.txt_btn}>Excluir imóvel</p>
                            <TrashIcon color='#27AE60' />
                        </button>
                        <button className={styles.btn_banner} onClick={e => (setInfosPopUp({ campo: "Status", tipo: "editar", valor: () => { return checarValorStatus(imovel.status) }, onConfirm: e => { alterarImovel(imovel.id_imovel, "status", checarValorStatus(imovel.status)) } }))}>
                            <p className={styles.txt_btn}>Ativar/Desativar imóvel</p>
                            <EyeIcon color='#27AE60' />
                        </button>
                    </div>

                    <div className={styles.cont_titulo}>
                        <p className={styles.txt_titulo}>{imovel.titulo}</p>
                        {imovel.status === "indisponivel" ?
                            <p className={styles.txt_id} style={{ backgroundColor: "#FDA0A0", color: "#FF0000" }}>{imovel.status?.toUpperCase()}</p>
                            :
                            <p className={styles.txt_id} style={{ backgroundColor: "#D9FDA0", color: "#00FF09" }}>{imovel.status?.toUpperCase()}</p>
                        }
                    </div>
                    <div className={styles.cont_imgs}>
                        <Swiper
                            slidesPerView={"auto"}
                            dir="rtl"

                            loop={true}
                            pagination={{
                                clickable: true,

                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className={styles.swiper}
                        >
                            {imovel?.fotos_imovel?.length > 0 ?
                                imovel.fotos_imovel.map((foto, index) => (
                                    <SwiperSlide key={index} className={styles.slides}>
                                        <img
                                            className={styles.img_slide}
                                            src={`https://goegrngmpfnwiuwzoksk.supabase.co/storage/v1/object/public/${foto.url}`}
                                            alt={`Foto ${index}`}
                                        />
                                    </SwiperSlide>
                                ))
                                :
                                <p>Sem imagens!</p>
                            }
                        </Swiper>
                    </div>
                    <div className={styles.cont_info_valor}>
                        <div className={styles.cont_info_maps}>
                            <p className={styles.txt_info}>Informações do imóvel</p>
                            <div className={styles.infos}>
                                <div className={styles.info}>
                                    <HouseHeart color="#27ae60" width={40} height={50} />
                                    {imovel.tipo_imovel == "apartamento" ?
                                        <div className={styles.desc_info}>Apartamento</div>
                                        :
                                        <div className={styles.desc_info}>Casa</div>
                                    }
                                </div>
                                <div className={styles.info}>
                                    <BedDoubleIcon color="#27ae60" width={40} height={50} />
                                    <div className={styles.desc_info}><span className={styles.span_info}>{imovel.quartos}</span> quarto(s)</div>
                                </div>
                                <div className={styles.info}>
                                    <BathIcon color="#27ae60" width={40} height={50} />
                                    <div className={styles.desc_info}><span className={styles.span_info}>{imovel.banheiros}</span> banheiro(s)</div>
                                </div>
                                <div className={styles.info}>
                                    <RulerDimensionLineIcon color="#27ae60" width={40} height={50} />
                                    <div className={styles.desc_info}><span className={styles.span_info}>{imovel.area_m2}m²</span> de área</div>
                                </div>
                            </div>
                            {urlEndereco != "" ?
                                <a className={styles.maps} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(urlEndereco)}`}>
                                    <LucideMapPinHouse color="#27ae60" width={40} height={50} />
                                    <div className={styles.cont_endereco}>
                                        <p>{imovel.rua}</p>
                                        <p>{imovel.bairro} • {imovel.cidade}</p>
                                    </div>
                                    <ArrowRightIcon color="#27ae60" width={40} height={50} />
                                </a> : <a href={""}>
                                    <div className={styles.maps}>
                                        <LucideMapPinHouse color="#27ae60" width={40} height={50} />
                                        <div className={styles.cont_endereco}>
                                            {imovel.rua}
                                            {imovel.bairro}
                                        </div>
                                        <ArrowRightIcon color="#27ae60" width={40} height={50} />
                                    </div>
                                </a>
                            }
                        </div>
                        <div className={styles.cont_valor}>
                            <p className={styles.subtxt_valor}>Valor do imóvel:</p>
                            <p className={styles.txt_valor}>{imovel.valor_imovel?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            {imovel.tipo_imovel == "apartamento" &&
                                <div className={styles.cont_cond}>
                                    <p className={styles.txt_cond}>Condomínio:</p>
                                    <p className={styles.txt_cond}>{imovel.valor_condominio?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
                            }
                            <button className={styles.btn_fale_comigo}>Fale comigo</button>
                            <div className={styles.cont_compartilhar}>
                                <ShareIcon color="#27ae60" width={40} height={40} />
                                <p className={styles.txt_compartilhar}>Compartilhar</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.cont_desc_corretor}>
                        <div className={styles.descricao}>
                            <p className={styles.txt_descricao}>Descrição do imóvel: </p>
                            <p className={styles.desc_descricao}>{imovel.descricao} </p>
                        </div>
                        <div className={styles.corretor}>
                            <img className={styles.img_corretor} src="../../../public/img_corretor.png" />
                            <p className={styles.desc_descricao}>Corretor Daniel dos Santos </p>
                        </div>
                    </div>

                    <div className={styles.cont_similares}>

                    </div>
                    <Footer />
                </div>
            }
        </div>
    )
}