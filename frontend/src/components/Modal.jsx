import styles from "../styles/Modal.module.css";
import { BadgeCheck, Ban, AlertTriangle } from "lucide-react";
import { useNavigate } from 'react-router-dom';


export default function Modal({ mensagem, display, tipo }) {

    var navigate = useNavigate()

    async function logout() {
        const response = await fetch('http://localhost:3333/admin/logout', {
            method: 'POST',
            credentials: 'include'
        });
        console.log("Logout realizado com sucesso!");
        navigate('/login')
    }

    if (tipo === "logout") {
        setTimeout(() => {
            logout()
        }, 2000);
    }

    return (
        <div className={styles.pop_up} style={{ display: display }}>
            {tipo === "error" ?
                <div className={styles.container} style={{ backgroundColor: "#ffefef" }}>
                    <div className={styles.cont_infos}>
                        <Ban className={styles.icon_popup} width={100} height={100} color="#ff0000" />
                        <p className={styles.txt_popup}>{mensagem}</p>
                    </div>
                </div>

                : tipo === "ok" ?
                    <div className={styles.container} style={{ backgroundColor: "#f2ffef" }}>
                        <div className={styles.cont_infos}>
                            <BadgeCheck className={styles.icon_popup} width={100} height={100} color="#27AE60" />
                            <p className={styles.txt_popup}>{mensagem}</p>
                        </div>
                    </div>
                    : tipo === "alert" ?
                        <div className={styles.container} style={{ backgroundColor: "#ffffef" }}>
                            <div className={styles.cont_infos}>
                                <AlertTriangle className={styles.icon_popup} width={100} height={100} color="#aeac27" />
                                <p className={styles.txt_popup}>{mensagem}</p>
                            </div>
                        </div> : tipo === "logout" ?
                            <div className={styles.container} style={{ backgroundColor: "#ffffef" }}>
                                <div className={styles.cont_infos}>
                                    <AlertTriangle className={styles.icon_popup} width={100} height={100} color="#aeac27" />
                                    <p className={styles.txt_popup}>{mensagem}</p>
                                </div>
                            </div> :
                            <div className={styles.container} style={{ backgroundColor: "#ffefef" }}>
                                <div className={styles.cont_infos}>
                                    NENHUM DOS TEMPLATES!
                                </div>
                            </div>
            }
        </div>
    )
}