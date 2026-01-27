import styles from '../styles/Filters.module.css';

import "swiper/css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from "react-router-dom";

import { useState } from "react";


export default function Filters() {
    const [searchParams, setSearchParams] = useSearchParams();

    function selectEscolhido(campo, valor) {
        if (campo) {
            valor = valor.toLowerCase()
            setSearchParams(prev => {
                prev.set(campo, valor);
                return prev;
            })
        }
    }

    function arrastarFiltros(lado) {
        var elemento = document.getElementById("container_cards")

        if (elemento) {
            var largura = elemento?.clientWidth
            console.log(largura);
            if (lado === "left") {
                elemento?.scrollBy({ left: -largura, behavior: 'smooth' })
            } else {

                elemento?.scrollBy({ left: largura, behavior: 'smooth' })
            }
        }
    }
    return (
        <div className={styles.cont_filters} >
            <button onClick={() => arrastarFiltros("left")}>
                <ChevronLeft/>
            </button>

            <div className={styles.cont_cards} id='container_cards'>
                <div className={styles.card}>
                    <p>Bairro</p>
                    <select name="" onChange={e => selectEscolhido("brr", e.target.value)} id="select_bairro">
                        <option value="Jardim das flores">Jardim das flores</option>
                        <option value="Jardim Dávila">Jardim Dávila</option>
                        <option value="Jardim D'Abril">Jardim D'Abril</option>
                        <option value="Jardim Bonança">Jardim Bonança</option>
                        <option value="Parque Continental">Parque Continental</option>
                        <option value="Centro">Centro</option>
                        <option value="Vila Yara">Vila Yara</option>
                    </select>
                </div>
                <div className={styles.card}>
                    <p>Tipo</p>
                    <select name="" onChange={e => selectEscolhido("tp", e.target.value)} id="select_tipo">
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
                    </select>
                </div>
                <div className={styles.card}>
                    <p>Quartos</p>
                    <select name="" onChange={e => selectEscolhido("qto", e.target.value)} id="select_quartos">
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                        <option value="6">6+</option>
                        <option value="7">7+</option>
                    </select>
                </div>
                <div className={styles.card}>
                    <p>Garagem</p>
                    <select name="" onChange={e => selectEscolhido("grg", e.target.value)} id="select_garagem">
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                    </select>
                </div>
                <div className={styles.card}>
                    <p>Banheiros</p>
                    <select name="" onChange={e => selectEscolhido("bnh", e.target.value)} id="select_banheiros">
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </select>
                </div>
                <div className={styles.card}>
                    <p>Estação próxima?</p>
                    <select name="" onChange={e => selectEscolhido("mtr", e.target.value)} id="select_metro">
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </div>

                <div className={styles.card}>
                    <p>Área</p>
                    <select name="" onChange={e => selectEscolhido("ar", e.target.value)} id="">
                        <option value="<25m">Até 25m²</option>
                        <option value="25a50">Entre 25 e 50m²</option>
                        <option value="50a75">Entre 50 e 75m²</option>
                        <option value="75a100">Entre 75 e 100m²</option>
                        <option value="100a125">Entre 100 e 125m²</option>
                        <option value="125a150">Entre 125 e 150m²</option>
                        <option value="150a175">Entre 150 e 175m²</option>
                        <option value="175a200">Entre 175 e 200m²</option>
                    </select>
                </div>
            </div>
            <button onClick={() => arrastarFiltros("right")}>
                <ChevronRight />
            </button>

        </div>

    )


}