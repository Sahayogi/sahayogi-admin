import "./Navbar.css"
import avatar from "../../assets/metamask.png"
import { FiBell } from "react-icons/fi";
import logo from "../../assets/Sahayogi.png"

const Navbar = () => {
    return (
        <nav className="navbar">
           
                <div className="navbarLeft">
                    <img src={logo} alt="" />
                </div>
                <div className="navbarRight">
                    <FiBell className="bell" />
                <div className="image">
                    <img src={avatar} alt="" />
                </div>

                </div>

      

        </nav>
    )
}

export default Navbar;