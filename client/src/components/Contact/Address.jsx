import styles from "./Contact.module.css";
function Address() {
  return (
    <div className={styles.infoItem}>
      <i className={`${styles.infoItemIcon} ri-map-pin-fill colorOrangish`}></i>
      <h3 className={`${styles.infoItemH3} fw-bold my-3`}>Address</h3>
      <p className={`${styles.infoItemPar} p-0 mb-0`}>
        Henry Kattan Street, Ein Monjid Ramallah.
      </p>
      <p className={`${styles.infoItemPar} p-0 mb-0`}>
        Shaher Abu Hayya street, Swieleh Amman, Jordan
      </p>
    </div>
  );
}

export default Address;
