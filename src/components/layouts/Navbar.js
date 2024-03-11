import styles from '../../styles/Navbar.module.css'
import logo from '../../images/logo-vtex.svg'

function Navbar (){

    return(
        <nav className={styles.navbar}>
            <img src={logo} alt="vtex" />
        </nav>
    )
}

export default Navbar