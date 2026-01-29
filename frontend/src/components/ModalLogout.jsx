import styles from "../styles/Header.module.css";
import { Timer, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';


export default function ModalLogout({mensagem, icon}) {
    var navigate = useNavigate()

    async function logout() {
        const response = await fetch('http://localhost:3333/admin/logout', {
            method: 'POST',
            credentials: 'include'
        });
        console.log("Logout realizado com sucesso!");
        navigate('/login')
    }
    setTimeout(() => {
        logout()
    }, 2000);

    return (
        <div className={styles.redirecionamento}>
            <div className={styles.container}>
                {icon === "timer" && <Timer></Timer>}
                {icon === "logout" && <LogOut></LogOut>}
                <p className={styles.txt_redirect}>{mensagem}</p>
            </div>
        </div>
    )
}