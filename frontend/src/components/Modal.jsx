import styles from "../styles/Modal.module.css";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';


export default function Modal({ mensagem, display }) {
    return (
        <div className={styles.pop_up} style={{ display: display }}>
            <div className={styles.container}>
                <BadgeCheck className={styles.icon_popup} width={100} height={100} color="#27AE60" />
                <p className={styles.txt_popup}>{mensagem}</p>
            </div>
        </div>
    )
}