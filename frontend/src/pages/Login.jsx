
import styles from "../styles/Login.module.css";
import Header from "../components/Header";
import { useState } from 'react';
import { CircleAlert } from "lucide-react";
import { useNavigate } from 'react-router-dom';


export default function Login() {
    var navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


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
                    response.json()
                        .then(function (res) {
                            console.log("JSON", res);
                            navigate('/admin')
                        })
                } else {
                    alert("Usuário não encontrado!")
                }
            }).catch(function (response) {
                alert("Erro:", response.status);
                console.log(response);
            })
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
                    <button className={styles.btn_login} onClick={checarCampos}>Entrar</button>
                    <div className={styles.cont_msg}>
                        <p className={styles.desc_form}>Está área é exclusiva para administradores</p>
                        <CircleAlert color="#999999" />
                    </div>
                </div>
            </div>
        </main>


    )

}