import { NavLink } from "react-router-dom"
import './navBar.css'
import { useTranslation } from "react-i18next";


const NavBar = () => {
    const { t } = useTranslation();  
    return (
        <div className="nav-wrapper">
            <nav>
                <ol>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'nav-isActive' : '')}
                            to='/'>
                            <i className="icon-home"></i>
                            <span>{t('Home')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'nav-isActive' : '')}
                            to='/unit'>
                            <i className="icon-office"></i>
                            <span>{t('Units')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'nav-isActive' : '')}
                            to='/guest'>
                            <i className="icon-users"></i>
                            <span>{t('Guests')}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'nav-isActive' : '')}
                            to='/reservation'>
                             <i className="icon-address-book"></i>
                            <span>{t('Reservations')}</span>
                        </NavLink>
                    </li>
                </ol>
            </nav>
        </div>
    )
}

export default NavBar