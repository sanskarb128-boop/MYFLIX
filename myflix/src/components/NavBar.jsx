import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "../Css/Navbar.css";

function NavBar() {
    const [logoHovered, setLogoHovered] = useState(false);
    const [homeHovered, setHomeHovered] = useState(false);
    const [favHovered, setFavHovered] = useState(false);

    return (
        <nav className="navbar">
            <Link
                to="/"
                className="logo"
                onMouseEnter={() => setLogoHovered(true)}
                onMouseLeave={() => setLogoHovered(false)}
            >
                <span
                    className="logo-text"
                    style={{
                        fontSize: logoHovered ? "2.7rem" : "2.4rem",
                        transform: logoHovered ? "scale(1.08)" : "scale(1)",
                        letterSpacing: logoHovered ? "10px" : "6px",
                        color: "#e50914",
                        textShadow: logoHovered
                            ? "0 0 20px rgba(229,9,20,1), 0 0 50px rgba(229,9,20,0.8)"
                            : "0 0 10px rgba(229,9,20,0.9), 0 0 30px rgba(229,9,20,0.6)",
                        transition: "all 0.3s ease"
                    }}
                >
                    NETFLIMIX
                </span>
            </Link>

            <div className="navbar-links">
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    onMouseEnter={() => setHomeHovered(true)}
                    onMouseLeave={() => setHomeHovered(false)}
                    style={{
                        color: homeHovered ? "#ffffff" : "#e50914",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                    }}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    onMouseEnter={() => setFavHovered(true)}
                    onMouseLeave={() => setFavHovered(false)}
                    style={{
                        color: favHovered ? "#ffffff" : "#e50914",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                    }}
                >
                    Favorites
                </NavLink>
            </div>
        </nav>
    );
}

export default NavBar;