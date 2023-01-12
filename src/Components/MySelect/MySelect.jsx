import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "./MySelect.module.scss";
const MySelect = ({ placeholder, list, handleClick }) => {
  const [active, setActive] = useState(false);
  const [textButton, setTextButton] = useState(false);

  const button = useRef();

  const closeDropDown = (e) => {
    console.log(123);
    if (e.type === "keydown") {
      if (e.key === "Escape") setActive(false);
      return;
    }
    setActive(false);
  };

  useEffect(() => {
    if (active) {
      document.addEventListener("click", closeDropDown);
      document.addEventListener("keydown", closeDropDown);
    }

    return () => {
      document.removeEventListener("click", closeDropDown);
      document.removeEventListener("keydown", closeDropDown);
    };
  }, [active]);

  const toggleDropDownStatus = () => {
    setActive(!active);
  };

  const clickListItem = (e) => {
    setTextButton(e.target.innerText);
    setActive(!active);
    if (handleClick) {
      handleClick(e);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={cn(styles.container, { [styles["active"]]: active })}>
      <button ref={button} className={styles.button} onClick={toggleDropDownStatus}>
        {textButton ? textButton : placeholder || "Выбрать..."}
      </button>
      <ul className={styles.ul}>
        {list.map((item) => (
          <li key={item.id} className={styles.li}>
            <button className={styles["item-button"]} onClick={clickListItem}>
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySelect;
