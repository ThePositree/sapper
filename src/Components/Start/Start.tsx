import cn from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IListSelect } from "../../types/select-types";
import { Select } from "../Select/Select";
import styles from "./Start.module.scss";

export const Start = () => {
	const [amountCells, setAmountCells] = useState<36 | 64 | 256>(36);
	const navigate = useNavigate();

	const list: IListSelect[] = [
		{
			id: 1,
			text: "36",
			style: styles.li1
		},
		{
			id: 2,
			text: "64",
			style: styles.li2
		},
		{
			id: 3,
			text: "256",
			style: styles.li3
		}
	];

	const selectAmountCells = (e: React.MouseEvent<HTMLButtonElement>) => {
		const value: number = +e.currentTarget.innerText;
		if (value === 36 || value === 64 || value === 256) {
			setAmountCells(value);
		}
	};

	return (
		<div className={cn(styles.wrapper, "appearance")}>
			<Select placeholder={"Select number of cells"} list={list} handleClick={selectAmountCells} />
			<button
				className={styles.button}
				onClick={() => {
					navigate("/play", {
						state: amountCells
					});
				}}
			>
				Start
			</button>
		</div>
	);
};
