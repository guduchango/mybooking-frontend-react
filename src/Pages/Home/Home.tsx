import { NavLink, useNavigate } from "react-router-dom"
import './home.css'
import { LayoutHome } from "../../Components/Layout/LayoutHome"
import { UserStorageService } from '../../Services/User/UserStorageService ';


const Home = () => {

    const navigate = useNavigate();

    const exitSession = () => {
        const userStorageService = new UserStorageService();
        userStorageService.deleteAllItems();
        navigate("/login")
    }

    return (
        <LayoutHome>
            <div className="home-iconExit">
                    <button onClick={exitSession}>
                        <i className="icon-exit"></i>
                    </button>
                </div>
            <div className="home">
                
                <div className="home-wrraper">
                    <h1>My Booking</h1>
                    <div className="homeWrapper-grid">
                        <div className="home-items">
                            <NavLink
                                to='/reservation'
                            >
                                <img width={50} src="./home-icons/booking.png"></img>
                            </NavLink>
                            <p>Reservations</p>
                        </div>

                        <div className="home-items">
                            <NavLink
                                to=''
                            >
                                <img width={50} src="./home-icons/budget.png"></img>
                            </NavLink>
                            <p>Expenses</p>
                        </div>
                        <div className="home-items">
                            <NavLink
                                to='/guest'
                            >
                                <img width={50} src="./home-icons/guests.png"></img>
                            </NavLink>
                            <p>Guests</p>
                        </div>
                        <div className="home-items">
                            <NavLink
                                to='/unit'
                            >
                                <img width={50} src="./home-icons/hotel.png"></img>
                            </NavLink>
                            <p>Rooms</p>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutHome>

    )
}

export default Home