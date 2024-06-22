import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import LanguageSelector from "../LanguageSelector";
import Nav from "./Nav";
import AdminDropdown from "./AdminDropdown";
import "./Header.css";
function Header() {
  return (
    <header className="header fixed-top">
      <div className="container d-flex align-items-center justify-content-lg-between">
        <h1 className="logo me-auto me-lg-0">
          <Link to="/">
            <img src={logo} alt="" className="logo m-0" />
          </Link>
        </h1>
        <Nav />
        <div className="d-flex align-items-center gap-5 adminDropdown">
          {localStorage.getItem("isAdmin") == 1 && (
            <AdminDropdown classNames="dropdown" />
          )}
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}

export default Header;
