import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function NavLinks() {
  const { t } = useTranslation();

  const links = [
    {
      title: t("home"),
      path: "",
    },
    {
      title: "dropdown",
      links: [
        {
          title: t("projects.key1"),
          path: "projects/bushnaq-businesses-center",
        },
        {
          title: t("projects.key2"),
          path: "projects/bushnaq-medical",
        },
        {
          title: t("projects.key3"),
          path: "projects/bushnaq-agriculture",
        },
        {
          title: t("projects.key4"),
          path: "projects/bushnaq-residential",
        },
      ],
    },
    {
      title: t("team"),
      path: "team",
    },
    {
      title: t("about"),
      path: "about",
    },
    {
      title: t("contact"),
      path: "contact",
    },
  ];

  const closeNav = () => {
    document.querySelector("#navbar").classList.remove("navbar-mobile");
    const nav = document.querySelector(".dropdownNav");
    if (nav.classList.contains("dropdown-active")) {
      nav.classList.remove("dropdown-active");
    }
  };
  const activeDropdown = () => {
    document.querySelector(".dropdownNav").classList.toggle("dropdown-active");
  };
  return links.map((link) =>
    link.links ? (
      <li className="dropdown" key={link.title}>
        <a
          className={`dropdown-toggle dropdown-toggle-split ${
            location.pathname === `/bushnaq-group/${link.path}` ? "active" : ""
          }`}
          onClick={activeDropdown}
        >
          <span>{t("projects.title")}</span>
          <i className="bi bi-chevron-down"></i>
        </a>
        <ul className="dropdownNav">
          {link.links.map((link) => (
            <li key={link.title}>
              <Link
                to={link.path}
                className={
                  location.pathname === `/bushnaq-group/${link.path}`
                    ? "active"
                    : ""
                }
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ) : (
      <li onClick={closeNav} key={link.title}>
        <Link
          to={link.path}
          className={
            location.pathname === `/bushnaq-group/${link.path}` ? "active" : ""
          }
        >
          {link.title}
        </Link>
      </li>
    )
  );
}

export default NavLinks;
