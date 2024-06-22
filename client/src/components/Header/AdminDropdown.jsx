import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

function AdminDropdown({ classNames }) {
  const { t } = useTranslation();

  const links = [
    {
      title: t("team"),
      path: "admin/team",
    },
    {
      title: t("contact"),
      path: "admin/contact",
    },
  ];

  return (
    <li className={classNames} style={{ listStyle: "none" }}>
      <button
        className="btn text-white bgOrangish dropdown-toggle"
        type="button"
        id="dropdownMenu"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {t("admin")}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
        {links.map((link) => (
          <li key={link.title}>
            <Link className="dropdown-item" to={link.path}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

AdminDropdown.propTypes = {
  classNames: PropTypes.string.isRequired,
};

export default AdminDropdown;
