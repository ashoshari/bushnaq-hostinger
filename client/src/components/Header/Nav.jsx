import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector";
import NavLinks from "./NavLinks";
import AdminDropdown from "./AdminDropdown";
function Nav() {
  let location = useLocation();
  const { t } = useTranslation();

  const closeNav = () => {
    document.querySelector("#navbar").classList.remove("navbar-mobile");
    const nav = document.querySelector(".dropdownNav");
    if (nav.classList.contains("dropdown-active")) {
      nav.classList.remove("dropdown-active");
    }
  };

  const toggleNav = () => {
    document.querySelector("#navbar").classList.toggle("navbar-mobile");
  };

  return (
    <nav id="navbar" className="navbar">
      <ul className="m-0 p-0">
        <NavLinks />
        {localStorage.getItem("isLoggedIn") ? (
          <li
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("isAdmin");
              window.location.reload();
            }}
          >
            <Link className="nav-link">{t("logout")}</Link>
          </li>
        ) : (
          <>
            <li onClick={closeNav}>
              <Link
                className={`nav-link scrollto ${
                  location.pathname === "/login" ? "active" : ""
                }`}
                to="/login"
              >
                {t("login")}
              </Link>
            </li>
            <li onClick={closeNav}>
              <Link
                className={`nav-link scrollto ${
                  location.pathname === "/signup" ? "active" : ""
                } `}
                to="/signup"
              >
                {t("signup")}
              </Link>
            </li>
          </>
        )}

        {localStorage.getItem("isAdmin") == 1 && (
          <AdminDropdown classNames="dropdown adminDropdownMobile nav-link" />
        )}
        <li className="nav-link adminDropdownMobile">
          <LanguageSelector />
        </li>
      </ul>
      <i className="fa-solid fa-bars mobile-nav-toggle" onClick={toggleNav}></i>
    </nav>
  );
}

export default Nav;
