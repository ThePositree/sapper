import cn from "classnames";
import { useState } from "react";
import { BsSuitHeart } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ICell, PlayingField } from "../../types/sapperTypes";
import styles from "./Play.module.scss";
import playingFieldFunc from "./playingFieldFunc";

function Play() {
	const location = useLocation();

	let { state } = location;

	if (!state) state = 64;

	const firstArrayCells: ICell[] = [...Array(state).keys()].map((number) => ({
		index: number,
		row: 0,
		col: 0,
		isBomb: false,
		isOpen: false,
		numBombNearby: 0
	}));

	const [firstPlayingField, setFirstPlayingField] = useState<ICell[] | false>(firstArrayCells);
	const [gameState, setGameState] = useState<0 | 1 | -1>(0);
	const [playingFieldState, setPlayingFieldState] = useState<PlayingField>();

	const objCnConditions = {
		[styles["inner-1"]]: state === 36,
		[styles["inner-2"]]: state === 64,
		[styles["inner-3"]]: state === 256
	};

	const openCell = (cell: ICell) => {
		if (gameState !== 0) return;
		if (firstPlayingField) {
			const result = playingFieldFunc(state, cell.index);
			const currentCell = result[0].find((item) => item.index === cell.index);
			if (currentCell) {
				const newPlayingField = result[1](currentCell);
				setFirstPlayingField(false);
				setPlayingFieldState(newPlayingField);
			}
		} else {
			const result = playingFieldState![1](cell);
			setGameState(result[2]);
			setPlayingFieldState(result);
		}
	};

	const resetGame = () => {
		setGameState(0);
		setFirstPlayingField(firstArrayCells);
		setPlayingFieldState(undefined);
	};

	const textCell = (cell: ICell) => {
		if (cell.isOpen) {
			if (cell.numBombNearby === 0) return "";
			return cell.numBombNearby;
		}
		return <BsSuitHeart />;
	};

	const playngFieldRender = () => {
		const mapRender = (item: ICell, index: number) => (
			<button
				type="button"
				className={cn(styles.cell, { [styles.open]: item.isOpen, [styles.bomb]: item.isBomb })}
				key={index}
				onClick={() => {
					openCell(item);
				}}
			>
				{textCell(item)}
			</button>
		);
		return (
			<div className={cn(styles.inner, objCnConditions)}>
				{firstPlayingField ? firstPlayingField.map(mapRender) : playingFieldState![0].map(mapRender)}
			</div>
		);
	};

	if (gameState === 1) {
		return (
			<div className={cn(styles.wrapper, styles["game-end"])}>
				{playngFieldRender()}
				<div className={styles.text}>Win</div>
				<button type="button" className={styles.button} onClick={resetGame}>
					Restart
				</button>
			</div>
		);
	}
	if (gameState === -1) {
		return (
			<div className={cn(styles.wrapper, styles["game-end"])}>
				{playngFieldRender()}
				<div className={styles.text}>Lose</div>
				<button type="button" className={styles.button} onClick={resetGame}>
					Restart
				</button>
			</div>
		);
	}
	return <div className={cn(styles.wrapper, "appearance")}>{playngFieldRender()}</div>;
}

export default Play;
