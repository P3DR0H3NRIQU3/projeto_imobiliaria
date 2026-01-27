import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.cont_cards}>
          
          <div className={styles.card}>
            <div className={styles.cont_logo}>
              <img
                src="/logo_black.jpg"
                alt="Imagem 1"
                className={styles.logo}
                width={60}
                height={60}
              />
              <p className={styles.txt_card}>
                Daniel | <span className={styles.txt_green_logo}>Imóveis</span>
              </p>
            </div>

            <p className={styles.subtxt_card}>
              Daniel dos Santos de Oliveira
            </p>
            <p className={styles.subtxt_card}>
              Corretor de Imóveis em Osasco - SP
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.txt_card}>Navegação</p>
            <div className={styles.cont_txts}>
              <p className={styles.subtxt_card}>Início</p>
              <p className={styles.subtxt_card}>Imóveis</p>
              <p className={styles.subtxt_card}>Destaques</p>
              <p className={styles.subtxt_card}>Fale comigo</p>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.txt_card}>Contato</p>
            <div className={styles.cont_txts}>
              <p className={styles.subtxt_card}>(11) 94927-7042</p>
              <p className={styles.subtxt_card}>
                corretor.danielso@gmail.com
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.txt_card}>Redes sociais</p>
            <div className={styles.cont_txts}>
              <p className={styles.subtxt_card}>Instagram</p>
              <p className={styles.subtxt_card}>Facebook</p>
              <p className={styles.subtxt_card}>Tiktok</p>
            </div>
          </div>

        </div>

        <p className={styles.txt_direitos}>
          © 2026 Daniel Imóveis. Todos os direitos reservados. | CRECI: 162170 F
        </p>
      </div>
    </div>
  );
}
