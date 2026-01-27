import styles from "../styles/Header.module.css";
import { User } from "lucide-react";

export default function HeaderAdmin() {
    return (
        <div className={styles.header}>
            <div className={styles.cont_logo}>
                <a href="/">
                    <p className={styles.txt_logo}>Daniel | <span className={styles.span_logo}>Imóveis</span></p>
                    <p className={styles.subtxt_logo}>Corretor de Imóveis em Osasco</p>
                </a>
            </div>
            <div className={styles.cont_link_btn}>
                <ul className={styles.cont_links}>
                    <a className={styles.link_header} href="/admin"><li >Início</li></a>
                </ul>
                <a href="/login">
                    <button className={styles.btn_header}>
                        <User />
                        <p>Sair</p>
                    </button>
                </a>

            </div>
        </div>
    )
}