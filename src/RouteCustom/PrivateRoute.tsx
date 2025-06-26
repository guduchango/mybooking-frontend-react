import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserStorageService } from "../Services/User/UserStorageService "


export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await new UserStorageService().getLastItem()
        setIsAuthenticated(!!user.token) // o lo que indique que está logueado
      } catch (error) {
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    // todavía se está cargando la info del auth
    return <div>Cargando...</div> // o un spinner si querés
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}
