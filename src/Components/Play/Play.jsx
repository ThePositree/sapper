import { useState } from "react";
import styles from "./Play.module.scss";
import { useLocation } from "react-router-dom";
import cn from "classnames";
import { playingFieldFunc } from "./playingFieldFunc";
import { BsSuitHeart } from "react-icons/bs";

const Play = () => {
  const { state } = useLocation();

  const [gameState, setGameState] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(false);
  const [playingFieldState, setPlayingFieldState] = useState([[...Array(state).keys()]]);

  const objCnConditions = {
    [styles["inner-1"]]: state === 36,
    [styles["inner-2"]]: state === 64,
    [styles["inner-3"]]: state === 256,
  };

  const openCell = (cell) => {
    if (isFirstClick) {
      const result = playingFieldState[1](cell);
      if (typeof result === "boolean") {
        if (result) {
          setGameState(1);
          return;
        } else {
          setGameState(-1);
          return;
        }
      }
      setPlayingFieldState(result);
    } else {
      setIsFirstClick(true);
      const result = playingFieldFunc(state, cell);
      const currentCell = result[0].find((item) => item.index === cell);
      setPlayingFieldState(result[1](currentCell));
    }
  };

  const resetGame = () => {
    setGameState(0);
    setIsFirstClick(false);
    setPlayingFieldState([[...Array(state).keys()]]);
  };

  const textCell = (cell) => {
    if (cell.isOpen) {
      if (cell.numBombNearby === 0) return "";
      return cell.numBombNearby;
    } else {
      return <BsSuitHeart />;
    }
  };

  if (gameState === 1) {
    return (
      <div className={styles.wrapper}>
        <div className={cn(styles.inner, objCnConditions)}>
          {playingFieldState[0].map((item, index) => (
            <button className={cn(styles.cell, { [styles.open]: item.isOpen, [styles.bomb]: item.isBomb })} key={index}>
              {textCell(item)}
            </button>
          ))}
        </div>
        <div className={styles.text}>Выиграл</div>
        <button className={styles.button} onClick={resetGame}>
          Заного
        </button>
      </div>
    );
  }
  if (gameState === -1) {
    return (
      <div className={styles.wrapper}>
        <div className={cn(styles.inner, objCnConditions)}>
          {playingFieldState[0].map((item, index) => (
            <button className={cn(styles.cell, { [styles.open]: item.isOpen, [styles.bomb]: item.isBomb })} key={index}>
              {textCell(item)}
            </button>
          ))}
        </div>
        <div className={styles.text}>Проигрыш</div>
        <button className={styles.button} onClick={resetGame}>
          Заного
        </button>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.inner, objCnConditions)}>
        {playingFieldState[0].map((item, index) => (
          <button
            className={cn(styles.cell, { [styles.open]: item.isOpen })}
            key={index}
            onClick={() => {
              openCell(item);
            }}>
            {textCell(item)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Play;
