import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../logo/toothdoctor.png";

export default function Header() {
  return (
    <header className="gap-1">
      <div className={styles.nav}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
          <p>NORDIC DENTAL</p>
        </div>
        <nav className={styles.link}>
          <ul className={`${styles.headerLink} gap-1`}>
            <li>
              <NavLink
                to={"/"}
                end
                className={({ isActive }) =>
                  isActive
                    ? `${styles.activeLink} ${styles.link}`
                    : `${styles.link}`
                }
              >
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/pacient"}
                end
                className={({ isActive }) =>
                  isActive
                    ? `${styles.activeLink} ${styles.link}`
                    : `${styles.link}`
                }
              >
                Patients
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
