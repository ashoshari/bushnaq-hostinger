import { useState } from "react";
import i18n from "./i18n";
import "./Header/Header.css";
const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // i18n.language contains the language assigned to lng in i18n.js file.
  const chooseLanguage = (e) => {
    const lang = selectedLanguage === "en" ? "ar" : "en";
    e.preventDefault();
    i18n.changeLanguage(lang); // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
    setSelectedLanguage(lang);
    localStorage.setItem("lang", lang);
    window.location.reload();
  };

  return (
    <div
      className="d-flex align-items-center text-white cursor-pointer language-selector"
      onClick={chooseLanguage}
    >
      {selectedLanguage === "en" ? "ar" : "en"}&nbsp;&nbsp;
      <i className="fa-solid fa-earth-europe fa-sm"></i>
    </div>
  );
};

export default LanguageSelector;
