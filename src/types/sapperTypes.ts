export interface ICell {
	index: number;
	row: number;
	col: number;
	isBomb: boolean;
	isOpen: boolean;
	numBombNearby: number;
}

export type GameState = 0 | 1 | -1;

export type PlayingField = [ICell[], CellOpen, GameState];

export type CellOpen = (cell: ICell) => PlayingField;
