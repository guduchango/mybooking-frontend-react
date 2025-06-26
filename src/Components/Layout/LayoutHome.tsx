import './layout.css'
import 'react-toastify/dist/ReactToastify.css';
interface LayoutProps{
    children: React.ReactNode
}

export const LayoutHome = ({children}:LayoutProps) => {

    return (
        <div className="layout">
            <div className="layout-wrapper">
                {children}
            </div>
        </div>
    )
}