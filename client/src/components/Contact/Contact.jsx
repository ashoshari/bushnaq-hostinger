import styles from "./Contact.module.css";
import Address from "./Address";
import CallUs from "./CallUs";
import EmailUs from "./EmailUs";
import OpenningHours from "./OpenningHours";
import ContactForm from "./ContactForm";
function Contact() {
  return (
    <section className="bg paddingTop">
      <div className="container">
        <div className={`${styles.container} text-center`} data-aos="fade-up">
          <h2
            className={`${styles.contactHeader} fw-bolder colorOrangish`}
            data-aos="fade-up"
          >
            Contact
          </h2>
        </div>

        <div
          className={`${styles.container} p-4`}
          style={{ position: "relative", zIndex: "1" }}
          data-aos="fade-up"
        >
          <div className="row gy-4">
            <div className="col-md-3">
              <Address />
            </div>

            <div className="col-md-3">
              <CallUs />
            </div>

            <div className="col-md-3">
              <EmailUs />
            </div>

            <div className="col-md-3">
              <OpenningHours />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
