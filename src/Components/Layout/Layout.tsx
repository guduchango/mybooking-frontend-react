
import NavBar from "../NavBar/NavBar"
import './layout.css'
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps{
    children: React.ReactNode
}

const Layout = ({children}:LayoutProps) => {

    return (
        <div className="layout">
            <div className="layout-wrapper">
                <NavBar />
                {children}
            </div>
        </div>
    )
}

export default Layout