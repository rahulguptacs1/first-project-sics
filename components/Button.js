import styles from '../styles/Button.module.scss'
function Button({children}) {
    return (
        <div className={styles.button}>
            {children}
        </div>
    )
}

export default Button
