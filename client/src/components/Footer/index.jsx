import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-6 col-md-4">
            <h5 className={styles.title}>AUDIT & INVOICE</h5>
            <p className={styles.description}>
              Audit activities and Invoicing control
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
                <a className={styles.footerlink} href="https://agerapp.com/">
                  Web page
                </a>
              </li>
              <li>
                <a href="mailto:algarol25@gmail.com">Albert García</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;