import Maps from "../projects/Maps";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import gmail from "../../assets/img/gmail.svg";
import whatsapp from "../../assets/img/whatsapp.svg";
import styles from "./Contact.module.css";

function ContactForm() {
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const form = useRef();
  const sendEmail = (e) => {
    setDisableBtn(true);
    e.preventDefault();

    emailjs
      .sendForm("service_xyqc3po", "template_el70kzv", form.current, {
        publicKey: "X_vSy5Inu4wd9iL0i",
      })
      .then(
        () => {
          setDisableBtn(false);
          setShowFlashMessage(true);
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className="row gy-4 paddingTop">
      <form className="col-md-6 px-lg-5 h-100" ref={form} onSubmit={sendEmail}>
        {showFlashMessage && (
          <div className="flash-message col-md-12">
            <div className="alert alert-success" role="alert">
              Your message has been sent successfully, Thank you for contacting
              Bushnaq group.
            </div>
          </div>
        )}
        <div className="row mb-4">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                id="form6Example1"
                className={`form-control ${styles.formInput}`}
                placeholder="First name"
              />
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                id="form6Example2"
                className={`form-control ${styles.formInput}`}
                placeholder="Last name"
              />
            </div>
          </div>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="text"
            id="form6Example3"
            className={`form-control ${styles.formInput}`}
            placeholder="Email"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <textarea
            className={`form-control ${styles.formInput}`}
            id="form6Example7"
            rows="10"
            placeholder="Your message"
          ></textarea>
        </div>

        <div className="d-flex gap-5 pt-5">
          <button
            className="bgOrangish btn py-2 px-4 btnHover text-white d-flex align-items-center"
            href="https://wa.me/962797393644?subject=subject&text=hello mama"
            target="_blank"
            disabled={disableBtn}
          >
            Send&nbsp;&nbsp;&nbsp;
            <img src={gmail} alt="" width="20" />
          </button>
          <a
            className="bgOrangish btn py-2 px-4 btnHover text-white d-flex align-items-center"
            href="https://wa.me/962797393644?subject=subject&text=hello mama"
            target="_blank"
          >
            WhatsApp&nbsp;&nbsp;&nbsp;
            <img src={whatsapp} alt="" width="20" />
          </a>
        </div>
      </form>
      <div className="col-md-6">
        <h3 className="text-white">Palestine, Ramallah</h3>
        <Maps height="400px" />
      </div>
    </div>
  );
}

export default ContactForm;
