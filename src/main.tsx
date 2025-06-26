import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './custom.css'
import './i18n'; // Importamos la configuración de i18n

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
