import styles from "./Play.module.scss";
import { useLocation } from "react-router-dom";
import cn from "classnames";

const Play = () => {
  const { state } = useLocation();

  let arrayCells = [];

  const amountBombs = Math.round(state / 5);

  let currentAmountBombs = 0;

  const amountRows = state / 8;

  const arrayRows = [];

  for (let index = 1; index <= amountRows; index++) {
    const reverse = index % 2 === 0 ? true : false;
    const obj = {
      reverse,
      index,
    };
    arrayRows.push(obj);
  }

  const addBomb = () => {
    arrayCells = arrayCells.map((item) => {
      if (amountBombs > currentAmountBombs) {
        if (!item.bomb) {
          const bomb = Math.random() <= 0.2;

          item.bomb = bomb;

          ++currentAmountBombs;
        }
      }
    });

    if (amountBombs > currentAmountBombs) {
      addBomb();
    } else {
      return;
    }
  };

  for (let index = 0; index < state; index++) {
    const color = index % 2;

    const bomb = Math.random() <= 0.2;

    if (bomb) ++currentAmountBombs;

    const obj = {
      color,
      bomb,
    };

    arrayCells.push(obj);
  }

  if (amountBombs > currentAmountBombs) {
    addBomb();
  }

  console.log(currentAmountBombs);

  return (
    <div className={styles.wrapper}>
      {arrayRows.map((item) => (
        <div key={item.index} className={cn(styles.row, { [styles["row-reverse"]]: item.reverse })}>
          {}
        </div>
      ))}
    </div>
  );
};

export default Play;
