import styles from "./Buttons.module.css"
function PrimaryBtn({ text, onCLick, type }) {
  return (
    <button className={styles["primary-btn"]} type={type} onClick={onCLick}>
      {text}
    </button>
  )
}

export default PrimaryBtn
