import styles from "../styles/Button.module.css";

export default function Button(props) {
  return (
    <button
      className={styles.btn_banner}
      onClick={props.onClick}
      style={{ width: props.width, height: props.height }}
    >
      <p className={styles.txt_btn}>{props.text}</p>

      {props.icon && (
        <img
          src={props.icon}
          alt="Icon botão"
          width={40}
          height={40}
        />
      )}
    </button>
  );
}
