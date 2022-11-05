import styles from "./Header.module.css"
function Header({ heading, subHeading }) {
  return (
    <header>
      <h1 className={styles["heading"]}>{heading}</h1>
      <h2 className={styles["sub-heading"]}>{subHeading}</h2>
    </header>
  )
}

export default Header
