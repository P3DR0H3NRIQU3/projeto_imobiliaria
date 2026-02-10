import styles from "../styles/ModalEdit.module.css";
import { useState, useEffect } from 'react';

export default function ModalEdit({ campo, valor, onError, onClose, onAccept, id_imovel }) {

    var [valorInput, setValorInput] = useState("")
    var [valorSelectTipoImovel, setValorSelectTipoImovel] = useState("")
    var [valorInputQuartos, setValorInputQuartos] = useState("")
    var [valorInputBanheiros, setValorInputBanheiros] = useState("")
    var [valorInputAreaM2, setValorInputAreaM2] = useState("")
    var [infoModal, setInfoModal] = useState({})

    async function editarCampo(campo, valor, id_imovel) {
        const respostaEdit = await fetch(`http://localhost:3333/admin/imovel/editar/${id_imovel}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({
                valor: valor,
                campo: campo,
            })
        })

        if (respostaEdit.ok) {
            alert(`Campo ${campo} foi alterado com sucesso!`)
            onAccept()
        }
        else {
            onError()
        }
    }

    return (
        <div className={styles.modal_edit}>
            {campo === "info" ?
                <div className={styles.container}>
                    <p className={styles.txt_titulo}>Editar os campos de informações?</p>
                    <div className={styles.cont_input}>
                        <p className={styles.txt_input}>Tipo imóvel</p>
                        <select name="" id="" onChange={e => (setValorSelectTipoImovel(e.target.value))} className={styles.input_edit_info}>
                            <option value="apartamento" selected>Apartamento</option>
                            <option value="casa">Casa</option>
                        </select>
                    </div>
                    <div className={styles.cont_input}>
                        <p className={styles.txt_input}>Quantidade de quartos</p>
                        <input type="text" className={styles.input_edit_info} onInput={e => (setValorInputQuartos(e.target.value))} name="" placeholder={valor.quartos} id="input_quartos" />

                    </div>

                    <div className={styles.cont_input}>
                        <p className={styles.txt_input}>Quantidade de banheiros</p>
                        <input type="text" className={styles.input_edit_info} onInput={e => (setValorInputBanheiros(e.target.value))} name="" placeholder={valor.banheiros} id="input_banheiros" />

                    </div>

                    <div className={styles.cont_input}>
                        <p className={styles.txt_input}>Área em m²</p>
                        <input type="text" className={styles.input_edit_info} onInput={e => (setValorInputAreaM2(e.target.value))} name="" placeholder={valor.area_m2} id="input_area_m2" />

                    </div>

                    <div className={styles.cont_btns}>
                        <button className={styles.btn_aviso} id={styles.btn_cancelar} onClick={onClose}>Cancelar</button>
                        <button className={styles.btn_aviso} id={styles.btn_confirmar} onClick={e => (editarCampo(campo, { tipo_imovel: valorSelectTipoImovel, quartos: valorInputQuartos, banheiros: valorInputBanheiros, area_m2: valorInputAreaM2 }, id_imovel))}>Confirmar</button>
                    </div>
                </div>
                :
                <div className={styles.container}>
                    <p className={styles.txt_titulo}>Editar o campo {campo}?</p>
                    <input type="text" className={styles.input_edit} onInput={e => (setValorInput(e.target.value))} name="" placeholder={valor} id="input_edit" />
                    <div className={styles.cont_btns}>
                        <button className={styles.btn_aviso} id={styles.btn_cancelar} onClick={onClose}>Cancelar</button>
                        <button className={styles.btn_aviso} id={styles.btn_confirmar} onClick={e => (editarCampo(campo, valorInput, id_imovel))}>Confirmar</button>
                    </div>
                </div>
            }
        </div>
    )
}