import styles from "../../styles/HomeAdmin.module.css";
import HeaderAdmin from "../../components/HeaderAdmin";
import { useState, useEffect } from 'react';
import { Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function HomeAdmin() {
    var navigate = useNavigate()

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
                else{
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
                    <p className={styles.txt_imoveis}><span className={styles.qte_imoveis}>231</span> imóveis</p>
                    <p className={styles.subtxt_imoveis}>Disponíveis em <span className={styles.cidade}>Osasco</span></p>
                </div>
                <div className={styles.cont_cards}>
                    <div className={styles.card}>
                        <img
                            src="/img_carousel.png"
                            alt="Imagem 1"
                            className={styles.img_card}
                            width={500}
                            height={400}
                        />

                        <div className={styles.cont_txt}>
                            <p className={styles.desc_imovel}>
                                Apartamento à venda de 150m² localizado na Vila São Francisco próximo à USP
                            </p>
                            <p className={styles.price_imovel}>R$1.400.000</p>
                            <p className={styles.despesas_imovel}>
                                R$1.450 Condomínio + IPTU
                            </p>
                            <p className={styles.end_imovel}>
                                Avenida Doutor Cândido Motta Filho, Cidade São Francisco · São Paulo
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )

}