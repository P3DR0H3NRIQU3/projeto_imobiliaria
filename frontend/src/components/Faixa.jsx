import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import styles from "../styles/Faixa.module.css";

import "swiper/css";

export default function Faixa() {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView="auto"
      spaceBetween={24}
      loop
      freeMode
      speed={1500}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <div className={styles.card_faixa}>
          Aproveite essa oportunidade!
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className={styles.card_faixa}>
          Imóveis a partir de R$110.000
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className={styles.card_faixa}>
          Não perca
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
