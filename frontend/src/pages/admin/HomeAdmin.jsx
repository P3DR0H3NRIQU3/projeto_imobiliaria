import styles from "../../styles/HomeAdmin.module.css";
import HeaderAdmin from "../../components/HeaderAdmin";
import { useState, useEffect } from 'react';
import { Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function HomeAdmin() {
    var navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [imoveis, setImoveis] = useState([]);
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
    async function buscarImoveis() {
        try {
            const response = await fetch('http://localhost:3333/admin/buscar-imoveis',
                {
                    method: 'GET',
                    credentials: 'include'
                }
            )
            if (response.ok) {
                const respostaBD = await response.json()
                setImoveis(respostaBD.dados)
                console.log(imoveis);
            }
            else {
                throw new Error(`Erro ao buscar imóveis: ${response.error}`)
            }

        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
    useEffect(() => {
        buscarImoveis()
        checarUsuario()
    }, []);
    if (loading) {
        return <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}><h1>Validando suas credenciais...</h1></div>
    }


    async function irParaImovel(imovel) {
        navigate(`/admin/imovel/slug=${imovel.slug}`, {
            state: { imovelDados: imovel }
        })
    }

    function navigateRegister() {
        navigate("/admin/register")
    }

    return (
        <main className={styles.home_admin}>
            <HeaderAdmin />
            <div className={styles.container}>
                <p className={styles.txt_name}>Olá, Admin</p>
                <button onClick={navigateRegister} className={styles.btn_cadastrar}>
                    <p className={styles.txt_btn}>Cadastrar Imóvel</p>
                    <Plus className={styles.icon_btn} color="#27AE60" />
                </button>
                <div className={styles.cont_txts}>
                    <p className={styles.txt_imoveis}>{imoveis != [] && <span className={styles.qte_imoveis}>{imoveis.length}</span>} imóveis</p>
                    <p className={styles.subtxt_imoveis}>Disponíveis em <span className={styles.cidade}>Osasco</span></p>
                </div>
                <div className={styles.cont_cards}>
                    {imoveis != [] &&
                        imoveis.map(imovel => {
                            return (<div className={styles.card} key={imovel.id_imovel} onClick={e => (irParaImovel(imovel))}>
                                <img
                                    src={`https://goegrngmpfnwiuwzoksk.supabase.co/storage/v1/object/public/${imovel.fotos_imovel}`}
                                    alt="Imagem card"
                                    className={styles.img_card}
                                    width={500}
                                    height={400}
                                />

                                <div className={styles.cont_txt}>
                                    <p className={styles.desc_imovel}>{imovel.titulo}</p>
                                    <p className={styles.price_imovel}>{imovel.valor_imovel?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                    <p className={styles.end_imovel}>{imovel.rua} - {imovel.bairro}</p>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>

        </main>
    )

}