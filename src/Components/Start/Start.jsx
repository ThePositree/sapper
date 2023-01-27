import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MySelect from "../MySelect/MySelect";
import styles from "./Start.module.scss";

const Start = () => {
  const [amountCells, setAmountCells] = useState(0);
  const navigate = useNavigate();

  const list = [
    {
      id: 1,
      text: "36",
    },
    {
      id: 2,
      text: "64",
    },
    {
      id: 3,
      text: "256",
    },
  ];

  const selectAmountCells = (e) => {
    setAmountCells(+e.target.innerText);
  };
  return (
    <div className={styles.wrapper}>
      <MySelect placeholder={"Выберите колличество клеток"} list={list} handleClick={selectAmountCells} />
      <button
        className={styles.button}
        onClick={() => {
          navigate("/play", {
            state: amountCells,
          });
        }}>
        Начать
      </button>
    </div>
  );
};

export default Start;
