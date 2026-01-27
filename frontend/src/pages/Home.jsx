import { useState } from 'react'
import styles from '../styles/Home.module.css'

import Button from "../components/Button";
import Carousel from "../components/Carousel";
import Faixa from "../components/Faixa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {

  return (
    <>
      <main className={styles.main_landing}>
        <Header></Header>
        <section className={styles.banner}>
          <div className={styles.bg_banner}></div>
          <div className={styles.container}>
            <p className={styles.txt_banner}>O NOVO PADRÃO DE MORAR BEM EM OSASCO.</p>
            <p className={styles.subtxt_banner}>Transformamos a busca pelo seu imóvel em experiência com nossa qualidade.</p>

            <Button text="Conhecer imóveis" width="25%" height="20%" icon="/seta_btn.png" />

          </div>
        </section>
        <section className={styles.buscar_imoveis}>
          <div className={styles.container}>
            <img
              src="/img_buscar.jpg"
              alt="imgm section buscar"
              width={700}
              height={0}
              className={styles.bg_buscar}
            ></img>
            <div className={styles.form_buscar}>

                <p className={styles.txt_buscar}>Buscar imóveis</p>
                <p className={styles.subtxt_buscar}>Imóveis em Osasco</p>

              <hr className={styles.hr_buscar} />

              <div className={styles.cont_select_buscar} id="select_bairro">
                <div className={styles.cont_img_txt}>
                  <img
                    src="/icon_maps.jpg"
                    alt="Seta imoveis"
                    width={40}
                    height={40}
                  ></img>
                  <p className={styles.txt_select}>Bairro</p>
                </div>
                <div className={styles.select_div}>
                  <select name="" className={styles.select_buscar} id="">
                    <option value="Jardim das flores">Jardim das flores</option>
                    <option value="Jardim Dávila">Jardim Dávila</option>
                    <option value="Jardim D'Abril">Jardim D'Abril</option>
                    <option value="Jardim Bonança">Jardim Bonança</option>
                    <option value="Parque Continental">Parque Continental</option>
                    <option value="Centro">Centro</option>
                    <option value="Vila Yara">Vila Yara</option>
                  </select>
                  <span className={styles.seta_select}>▼</span>

                </div>
              </div>

              <div className={styles.cont_select_buscar} id="select_tipo">
                <div className={styles.cont_img_txt}>
                  <img src="/icon_home.jpg" alt="Seta imoveis" width={40} height={40}></img>
                  <p className={styles.txt_select}>Tipo de imóvel</p>
                </div>

                <div className={styles.select_div}>
                  <select name="" className={styles.select_buscar} id="">
                    <option value="Jardim das flores">Apartamento</option>
                    <option value="Jardim Dávila">Casa</option>
                  </select>
                  <span className={styles.seta_select}>▼</span>

                </div>

              </div>



              <div className={styles.cont_selects_cf_qt}>
                <div className={styles.cont_select_buscar} id="select_valor">
                  <div className={styles.cont_img_txt}>
                    <img src="/icon_cifrao.jpg" alt="Seta imoveis" width={40} height={40}></img>
                    <p className={styles.txt_select}>Imóveis até</p>
                  </div>
                  <div className={styles.select_div}>
                    <select name="" className={styles.select_buscar} id="">
                      <option value="100k">R$100.000</option>
                      <option value="200k">R$200.000</option>
                      <option value="300k">R$300.000</option>
                      <option value="400k">R$400.000</option>
                      <option value="500k">R$500.000</option>
                      <option value="800k">R$800.000</option>
                    </select>
                    <span className={styles.seta_select}>▼</span>

                  </div>

                </div>
                <div className={styles.cont_select_buscar} id="select_quarto">
                  <div className={styles.cont_img_txt}>
                    <img src="/icon_quarto.jpg" alt="Seta imoveis" width={40} height={40}></img>
                    <p className={styles.txt_select}>Quartos</p>
                  </div>
                  <div className={styles.select_div}>
                    <select name="" className={styles.select_buscar} id="">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>

                    </select>
                    <span className={styles.seta_select}>▼</span>

                  </div>

                </div>
              </div>
              <Button text="Buscar imóveis" width="90%" height="7.5%" />

            </div>
          </div>
        </section>

        <section className={styles.destaques}>
          <div className={styles.container}>
            <p className={styles.txt_destaque}>Destaques</p>
            <div className={styles.cont_carousel}>
              <Carousel tipo="destaque" slidesPerView={3} />
              <hr />
              <Carousel tipo="destaque" slidesPerView={3} />
            </div>
          </div>
        </section>

        <section className={styles.faixa}>
          <Faixa />
        </section>

        <section className={styles.quem_sou}>
          <div className={styles.container}>
            <div className={styles.cont_txts}>
              <p className={styles.txt_quem_sou}>Quem sou?</p>
              <p className={styles.subtxt_quem_sou}>Corretor Daniel dos Santos de Oliveira</p>
              <p className={styles.desc_quem_sou}>Sou corretor que atua na região de Osasco, com foco em  venda de imóveis seguros, bem localizados e com suporte total.</p>
            </div>
            <img src="/img_quem_sou.jpg" alt="" width={500} height={500} className={styles.img_quem_sou}></img>
          </div>
        </section>

        <section className={styles.fale_conosco}>
          <div className={styles.container}>
            <p className={styles.txt_fale_conosco}>Fale com um corretor especialista em Osasco</p>
            <p className={styles.subtxt_fale_conosco}>Tire dúvidas sobre imóveis e tenha um atendimento personalizado.</p>
            <button className={styles.btn_fale_conosco}>Falar no WhatsApp</button>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}

export default Home
