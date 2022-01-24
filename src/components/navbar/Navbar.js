import "./Navbar.css"
import avatar from "../../assets/metamask.png"
import { FiBell } from "react-icons/fi";
const Navbar = () => {
    return (
        <nav className="navbar">
            {/* <div className="title">
                <h1>Welcome to <span>SAHAYOGI!!!</span> </h1>
            </div> */}
            <div className="navbar__right">
                <FiBell className="bell" />
                <div className="image">
                    <img src={avatar} alt="" />
                </div>

            </div>

        </nav>
    )
}

export default Navbar;