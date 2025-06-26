import { useRoutes } from "react-router-dom"
import Home from "../Pages/Home/Home"
import { ReservationList } from "../Pages/Reservation/ReservationList"
import { ReservationDetails } from "../Pages/Reservation/ReservationDetails"
import { ReservationEdit } from "../Pages/Reservation/ReservationEdit"
import { UnitList } from "../Pages/Unit/UnitList"
import { UnitSave } from "../Pages/Unit/UnitSave"
import { GuestSave } from "../Pages/Guest/GuestSave"
import { GuestList } from "../Pages/Guest/GuestList"
import { PriceCalendar } from "../Pages/Price/PriceCalendar"
import { UnitAvailableForm } from "../Pages/Unit/UnitAvailableForm"
import { UnitAvailableList } from "../Pages/Unit/UnitAvailableList"
import { ReservationCalendar } from "../Pages/Reservation/ReservationCalendar"
import { ReservationCreate } from "../Pages/Reservation/ReservationCreate"
import { Register } from "../Pages/Register/Register"
import { Login } from "../Pages/Login/Login"
import { PrivateRoute } from "./PrivateRoute"

const RouteCustom = () => {

  return  useRoutes([
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/reservation', element: <PrivateRoute><ReservationList /></PrivateRoute>},
      { path: '/reservation/details', element: <PrivateRoute><ReservationDetails /></PrivateRoute> },
      { path: '/reservation/create', element: <PrivateRoute><ReservationCreate /></PrivateRoute> },
      { path: '/reservation/edit', element: <PrivateRoute><ReservationEdit /></PrivateRoute> },
      { path: '/reservation/check', element: <PrivateRoute><UnitAvailableForm /></PrivateRoute>},
      { path: '/reservation/available-units', element: <PrivateRoute><UnitAvailableList /></PrivateRoute> },
      { path: '/reservation/calendar', element: <PrivateRoute><ReservationCalendar /></PrivateRoute> },
      { path: '/unit', element: <PrivateRoute><UnitList /></PrivateRoute> },
      { path: '/unit/save', element: <PrivateRoute><UnitSave /></PrivateRoute> },
      { path: '/guest/save', element: <PrivateRoute><GuestSave /></PrivateRoute> },
      { path: '/guest', element: <PrivateRoute><GuestList /></PrivateRoute> },
      { path: '/price/calendar', element: <PrivateRoute><PriceCalendar /></PrivateRoute> },
    ])
  
}

export default RouteCustom