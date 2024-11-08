import { CellOpen, ICell, PlayingField } from "../../types/sapperTypes";

const playingFieldFunc = (amountCells: 36 | 64 | 256, firstNumber: number): PlayingField => {
	let numRows: 16 | 8 | 6 = 16;

	if (amountCells === 64) numRows = 8;
	if (amountCells === 36) numRows = 6;

	const numBombs = Math.floor(amountCells / 5);

	const randomElemFromArray = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

	const firstCell: ICell = {
		index: firstNumber,
		row: Math.floor(firstNumber / numRows),
		col: firstNumber % numRows,
		isBomb: false,
		isOpen: false,
		numBombNearby: 0
	};

	const numbCellsToOpenNearby: number = (() => {
		if (amountCells === 36) return randomElemFromArray<number>([0, 1, 2, 3]);
		if (amountCells === 64) return randomElemFromArray<number>([0, 1, 2, 3, 4, 5, 6]);
		if (amountCells === 256) return randomElemFromArray<number>([0, 1, 2, 3, 5, 6, 7, 8, 9]);
		return randomElemFromArray<number>([0, 1, 2, 3]);
	})();

	const cellsForStart = [firstCell];

	const arrayCells: ICell[] = [];

	const getNearbyCells = (cell: ICell) => {
		const result: ICell[] = [];
		for (let i = -1; i < 2; i++) {
			const row = cell.row - i;
			if (Math.sign(row) === -1) continue;
			if (row >= numRows) continue;
			for (let j = -1; j < 2; j++) {
				const col = cell.col - j;
				const index = row * numRows + col;
				if (Math.sign(col) === -1) continue;
				if (col >= numRows) continue;
				if (cell.index === index) continue;

				let obj = arrayCells.find((item) => item.index === index);
				if (!obj) {
					obj = {
						index,
						row,
						col,
						isBomb: false,
						isOpen: false,
						numBombNearby: 0
					};
				}
				result.push(obj);
			}
		}

		return result;
	};

	for (let i = 0; i < numbCellsToOpenNearby; i++) {
		const cell = randomElemFromArray<ICell>(cellsForStart);
		const newCell = randomElemFromArray<ICell>(getNearbyCells(cell));
		const isUsingCell = cellsForStart.find((item) => item.index === newCell.index);
		if (isUsingCell) {
			i--;
			continue;
		}
		cellsForStart.push(newCell);
	}

	const arrayIndexBombs = (() => {
		let arr = [...Array(amountCells).keys()].sort(() => Math.random() - 0.5);
		for (let i = 0; i < cellsForStart.length; i++) {
			const indexForSlice = cellsForStart[i].index;
			const nearbyCells = getNearbyCells(cellsForStart[i]);
			arr = arr.filter((indexBomb) => indexBomb !== indexForSlice);
			for (const cell of nearbyCells) {
				arr = arr.filter((indexBomb) => indexBomb !== cell.index);
			}
		}
		return arr.slice(0, numBombs);
	})();

	for (let i = 0; i < amountCells; i++) {
		let numBombNearby = 0;

		const isBomb = arrayIndexBombs.includes(i);

		const cell: ICell = {
			index: i,
			row: Math.floor(i / numRows),
			col: i % numRows,
			isBomb,
			isOpen: false,
			numBombNearby
		};
		if (isBomb) {
			numBombNearby = -1;
			getNearbyCells(cell).map((item) => ({
				...item,
				numBombNearby: !item.isBomb ? item.numBombNearby + 1 : item.numBombNearby
			}));
		} else {
			getNearbyCells(cell).forEach((element) => {
				if (element.isBomb) {
					numBombNearby++;
				}
			});
		}

		cell.numBombNearby = numBombNearby;

		arrayCells.push(cell);
	}

	const checkedCells: ICell[] = [];

	for (const cell of arrayCells) {
		let checkedCell = checkedCells.find((item) => item.index === cell.index);
		if (checkedCell) continue;
		let bombNearby = 0;
		checkedCells.push(cell);
		const nearbyCells = getNearbyCells(cell);
		for (const nearbyCell of nearbyCells) {
			checkedCell = checkedCells.find((item) => item.index === nearbyCell.index);
			if (checkedCell) continue;
			if (nearbyCell.isBomb) bombNearby++;
		}

		if (bombNearby === nearbyCells.length) {
			cell.isBomb = true;
			cell.numBombNearby = -1;
		}
	}

	const openCell: CellOpen = (propCell) => {
		const openNearbyCells = (arrCells: ICell[]) => {
			for (const cell of arrCells) {
				if (cell.isOpen) continue;
				if (cell.numBombNearby === 0) {
					cell.isOpen = true;
					const nearbyCells = getNearbyCells(cell);
					openNearbyCells(nearbyCells);
				} else if (cell.numBombNearby !== -1) {
					cell.isOpen = true;
				}
			}
		};

		if (propCell.isOpen) return [arrayCells, openCell, 0];

		// eslint-disable-next-line no-param-reassign
		propCell.isOpen = true;

		if (propCell.isBomb) return [arrayCells, openCell, -1];

		let win = false;

		const nearbyCells = getNearbyCells(propCell);

		openNearbyCells(nearbyCells);

		for (const cell of arrayCells) {
			if (!cell.isBomb) {
				if (!cell.isOpen) {
					win = false;
					break;
				} else {
					win = true;
				}
			}
		}

		if (win) return [arrayCells, openCell, 1];

		return [arrayCells, openCell, 0];
	};

	return [arrayCells, openCell, 0];
};

export default playingFieldFunc;
