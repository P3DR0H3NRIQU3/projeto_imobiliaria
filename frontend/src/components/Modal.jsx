import styles from "../styles/Modal.module.css";
import { BadgeCheck, Ban } from "lucide-react";

export default function Modal({ mensagem, display, tipo }) {
    return (
        <div className={styles.pop_up} style={{ display: display }}>
            {tipo === "error" ?
                <div className={styles.container} style={{backgroundColor: "#ffefef"}}>
                    <div className={styles.cont_infos}>
                        <Ban className={styles.icon_popup} width={100} height={100} color="#ff0000" />
                        <p className={styles.txt_popup}>{mensagem}</p>
                    </div>
                </div>

                :
                <div className={styles.container} style={{backgroundColor: "#f2ffef"}}>

                    <div className={styles.cont_infos}>
                        <BadgeCheck className={styles.icon_popup} width={100} height={100} color="#27AE60" />
                        <p className={styles.txt_popup}>{mensagem}</p>
                    </div>

                </div>
            }
        </div>
    )
}