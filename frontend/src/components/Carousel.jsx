import styles from "../styles/Carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Carousel({ tipo, slidesPerView }) {
  return (
    <Swiper slidesPerView={slidesPerView} >
      {tipo === "destaque" && (
        <SwiperSlide>
          <div className={styles.card}>
            <img
              src="/img_carousel.png"
              alt="Imagem 1"
              className={styles.img_card}
              width={500}
              height={400}
            />

            <div className={styles.cont_txt}>
              <p className={styles.desc_imovel}>
                Apartamento à venda de 150m² localizado na Vila São Francisco próximo à USP
              </p>
              <p className={styles.price_imovel}>R$1.400.000</p>
              <p className={styles.despesas_imovel}>
                R$1.450 Condomínio + IPTU
              </p>
              <p className={styles.end_imovel}>
                Avenida Doutor Cândido Motta Filho, Cidade São Francisco · São Paulo
              </p>
            </div>
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}
