import styles from "./Contact.module.css";
function CallUs() {
  return (
    <div className={styles.infoItem}>
      <i
        className={`${styles.infoItemIcon} fa-solid fa-phone colorOrangish`}
      ></i>
      <h3 className={`${styles.infoItemH3} fw-bold my-3`}>Call Us</h3>
      <p className={`${styles.infoItemPar} p-0 mb-0`}>+97222959648</p>
      <p className={`${styles.infoItemPar} p-0 mb-0`}>+972569564242</p>
      <p className={`${styles.infoItemPar} p-0 mb-0`}>+96265345611</p>
      <p className={`${styles.infoItemPar} p-0 mb-0`}>+962777999059</p>
    </div>
  );
}

export default CallUs;
