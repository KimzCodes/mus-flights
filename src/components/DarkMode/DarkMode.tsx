import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDarkMode } from "../../store/darkmode/darkModeSlice";
import styles from "./style.module.css";

const DarkMode = () => {
  const dispatch = useAppDispatch();
  const darkModeOn = useAppSelector((state) => state.darkMode.darkModeOn);

  useEffect(() => {
    // Apply or remove dark mode styles based on the state
    if (darkModeOn) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkModeOn]);

  return (
    <div className={styles.darkMode}>
      <h5>DarkMode</h5>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          onChange={() => dispatch(setDarkMode())}
          checked={darkModeOn ? true : false}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default DarkMode;
