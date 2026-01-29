
import styles from "../styles/Login.module.css";
import Header from "../components/Header";
import { useState } from 'react';
import { CircleAlert, BadgeCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';



export default function Login() {
    var navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [display, setDisplay] = useState('none')
    const [mensagemErro, setMensagemErro] = useState("Erro ao fazer login")


    function checarCampos() {
        if (email === "" || password === "") {
            alert("Preencha todos os campos para prosseguir!")
        } else {
            consultarUsuario(email, password)
        }
    }
    async function consultarUsuario() {
        await fetch("http://localhost:3333/admin/auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(function (response) {
                if (response.ok) {
                    console.log("response", response);
                    setStatus("sucesso")
                    setDisplay("flex")
                    setTimeout(() => {
                        navegarAdmin()
                    }, 2500);
                } else {
                    if (response.status == 401) {
                        setStatus("erro")
                        console.log(response);
                        setMensagemErro("Usuário e/ou senha inválidos.")
                    }
                    setStatus("erro")
                    console.log(response);
                    setMensagemErro("Erro ao tentar fazer o login.")
                    setTimeout(() => {
                        sumirMensagem()
                    }, 5000);
                }
            }).catch(function (response) {
                console.log(response);
                setStatus("erro")
            })

        function sumirMensagem() {
            setStatus("")
        }

        function navegarAdmin() {
            navigate('/admin')

        }

    }
    return (
        <main className={styles.login}>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.form}>
                    <p className={styles.txt_form}>Login</p>
                    <div className={styles.cont_inp}>
                        <p className={styles.txt_inp} >Email</p>
                        <input type="text" name="" placeholder="Insira seu e-mail" onChange={(e) => { setEmail(e.target.value) }} value={email} id="inp_email" className={styles.inp_form} />
                        <p className={styles.txt_inp} >Senha</p>
                        <input type="password" name="" placeholder="Insira sua senha" onChange={(e) => { setPassword(e.target.value) }} value={password} id="inp_senha" className={styles.inp_form} />
                    </div>
                    {status === "erro" &&
                        <p className={styles.txt_erro}>{mensagemErro}</p>
                    }
                    <button className={styles.btn_login} onClick={checarCampos}>Entrar</button>
                    <div className={styles.cont_msg}>
                        <p className={styles.desc_form}>Está área é exclusiva para administradores</p>
                        <CircleAlert color="#999999" />
                    </div>
                </div>
                <div className={styles.pop_up} style={{ display: display }}>
                    <div className={styles.container}>
                        <BadgeCheck className={styles.icon_popup} width={100} height={100} color="#27AE60" />
                        <p className={styles.txt_popup}>Login efetuado com sucesso! Aguarde...</p>
                    </div>
                </div>
            </div>
        </main>


    )

}