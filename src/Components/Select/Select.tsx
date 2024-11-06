import cn from "classnames";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { IListSelect } from "../../types/selectTypes";
import styles from "./Select.module.scss";

interface IProps {
	placeholder: string;
	list: IListSelect[];
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Select: FC<IProps> = ({ placeholder, list, handleClick }) => {
	const [active, setActive] = useState(false);
	const [textButton, setTextButton] = useState("");

	const button = useRef<HTMLButtonElement>(null);

	const closeDropDown = () => {
		setActive(false);
	};

	const closeDropDownKeyboard = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") closeDropDown();
	}, []);

	useEffect(() => {
		if (active) {
			document.addEventListener("click", closeDropDown);
			document.addEventListener("keydown", closeDropDownKeyboard);
		}

		return () => {
			document.removeEventListener("click", closeDropDown);
			document.removeEventListener("keydown", closeDropDownKeyboard);
		};
	}, [active, closeDropDownKeyboard]);

	const toggleDropDownStatus = () => {
		setActive(!active);
	};

	const clickListItem: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		setTextButton(e.currentTarget.innerText);
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
			className={cn(styles.container, { [styles["active"]]: active })}
		>
			<button ref={button} className={styles.button} onClick={toggleDropDownStatus}>
				{textButton ? textButton : placeholder || "Select..."}
			</button>
			<ul className={styles.ul}>
				{list.map((item) => (
					<li key={item.id} className={cn(styles.li, item.style)}>
						<button className={styles["item-button"]} onClick={clickListItem}>
							{item.text}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
