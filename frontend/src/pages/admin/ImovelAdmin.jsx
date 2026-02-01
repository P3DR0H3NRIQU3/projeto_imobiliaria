import HeaderAdmin from "../../components/HeaderAdmin";
import Footer from "../../components/Footer";
import styles from "../../styles/ImovelAdmin.module.css";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EyeIcon, TrashIcon, BedDoubleIcon, BathIcon, RulerDimensionLineIcon, HouseHeart, LucideMapPinHouse, ArrowRightIcon, ShareIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';


export default function ImovelAdmin() {
    const params = useParams()
    var [imoveis, setImoveis] = useState({});
    var [urlEndereco, setUrlEndereco] = useState("");


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
            setImoveis(respostaBDJson.dados)

            var enderecoCompleto = `${respostaBDJson.dados.rua}, ${respostaBDJson.dados.bairro}, ${respostaBDJson.dados.cidade}`;
            setUrlEndereco(enderecoCompleto)
        }
        else {
            console.log("ERRO")
        }
    }

    useEffect(() => {
        buscarDados()
    }, []);


    return (
        <div className={styles.imovel}>
            <HeaderAdmin />
            {imoveis != {} &&
                <div className={styles.container}>
                    <div className={styles.cont_btns}>
                        <button className={styles.btn_banner}>
                            <p className={styles.txt_btn}>Excluir imóvel</p>
                            <TrashIcon color='#27AE60' />
                        </button>
                        <button className={styles.btn_banner}>
                            <p className={styles.txt_btn}>Ativar/Desativar imóvel</p>
                            <EyeIcon color='#27AE60' />
                        </button>
                    </div>
                    <div className={styles.cont_titulo}>
                        <p className={styles.txt_titulo}>{imoveis.titulo}</p>
                        {imoveis.status === "indisponivel" ?
                            <p className={styles.txt_id} style={{ backgroundColor: "#FDA0A0", color: "#FF0000" }}>{imoveis.status?.toUpperCase()}</p>
                            :
                            <p className={styles.txt_id} style={{ backgroundColor: "#D9FDA0", color: "#00FF09" }}>{imoveis.status?.toUpperCase()}</p>
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
                            {imoveis?.fotos_imovel?.length > 0 ?
                                imoveis.fotos_imovel.map((foto, index) => (
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
                                    {imoveis.tipo_imovel == "apartamento" ?
                                        <div className={styles.desc_info}>Apartamento</div>
                                        :
                                        <div className={styles.desc_info}>Casa</div>
                                    }
                                </div>
                                <div className={styles.info}>
                                    <BedDoubleIcon color="#27ae60" width={40} height={50} />
                                    <div className={styles.desc_info}><span className={styles.span_info}>{imoveis.quartos}</span> quarto(s)</div>
                                </div>
                                <div className={styles.info}>
                                    <BathIcon color="#27ae60" width={40} height={50} />
                                    <div className={styles.desc_info}><span className={styles.span_info}>{imoveis.banheiros}</span> banheiro(s)</div>
                                </div>
                                <div className={styles.info}>
                                    <RulerDimensionLineIcon color="#27ae60" width={40} height={50} />
                                    <div className={styles.desc_info}><span className={styles.span_info}>{imoveis.area_m2}m²</span> de área</div>
                                </div>
                            </div>
                            {urlEndereco != "" ?
                                <a className={styles.maps} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(urlEndereco)}`}>
                                    <LucideMapPinHouse color="#27ae60" width={40} height={50} />
                                    <div className={styles.cont_endereco}>
                                        <p>{imoveis.rua}</p>
                                        <p>{imoveis.bairro} • {imoveis.cidade}</p>
                                    </div>
                                    <ArrowRightIcon color="#27ae60" width={40} height={50} />
                                </a> : <a href={""}>
                                    <div className={styles.maps}>
                                        <LucideMapPinHouse color="#27ae60" width={40} height={50} />
                                        <div className={styles.cont_endereco}>
                                            {imoveis.rua}
                                            {imoveis.bairro}
                                        </div>
                                        <ArrowRightIcon color="#27ae60" width={40} height={50} />
                                    </div>
                                </a>
                            }
                        </div>
                        <div className={styles.cont_valor}>
                            <p className={styles.subtxt_valor}>Valor do imóvel:</p>
                            <p className={styles.txt_valor}>{imoveis.valor_imovel?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            {imoveis.tipo_imovel == "apartamento" &&
                                <div className={styles.cont_cond}>
                                    <p className={styles.txt_cond}>Condomínio:</p>
                                    <p className={styles.txt_cond}>{imoveis.valor_condominio?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
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
                            <p className={styles.desc_descricao}>{imoveis.descricao} </p>
                        </div>
                        <div className={styles.corretor}>
                            <img className={styles.img_corretor} src="../../../public/img_corretor.png" />
                            <p className={styles.desc_descricao}>Corretor Daniel dos Santos </p>
                        </div>
                    </div>

                    <div className={styles.cont_similares}>

                    </div>
                    <Footer/>
                </div>
            }
        </div>
    )
}