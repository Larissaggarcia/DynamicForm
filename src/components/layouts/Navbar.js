import styles from '../../styles/Navbar.module.css'
import logo from '../../images/logo-vtex.svg'

function Navbar (){

    return(
        <nav className={styles.navbar}>
            <img src={logo} alt="vtex" className={styles.logo}/>
        </nav>
    )
}

export default Navbar