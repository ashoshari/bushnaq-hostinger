import styles from "./Contact.module.css";

function EmailUs() {
  return (
    <div className={styles.infoItem}>
      <i className={`${styles.infoItemIcon} ri-mail-fill colorOrangish`}></i>
      <h3 className={`${styles.infoItemH3} fw-bold my-3`}>Email Us</h3>
      <p className={`${styles.infoItemPar} p-0 mb-0`}>Sbushnaq@bushnaq.group</p>
      <p
        className={`${styles.infoItemPar} p-0 mb-0`}
        style={{ visibility: "hidden" }}
      >
        dsa
      </p>
    </div>
  );
}

export default EmailUs;
