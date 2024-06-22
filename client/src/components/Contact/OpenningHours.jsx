import styles from "./Contact.module.css";

function OpenningHours() {
  return (
    <div className={styles.infoItem}>
      <i
        className={`${styles.infoItemIcon} fa-solid fa-clock colorOrangish`}
      ></i>
      <h3 className={`${styles.infoItemH3} fw-bold my-3`}>Open Hours</h3>
      <p className={`${styles.infoItemPar} p-0 mb-0`}>Sunday - Thursday</p>
      <p className={`${styles.infoItemPar} p-0 mb-0`}>9:00AM - 05:00PM</p>
    </div>
  );
}

export default OpenningHours;
