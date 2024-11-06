export interface ICell {
	index: number;
	row: number;
	col: number;
	isBomb: boolean;
	isOpen: boolean;
	numBombNearby: number;
}

export type gameState = 0 | 1 | -1;

export type playingField = [ICell[], cellOpen, gameState];

export type cellOpen = (cell: ICell) => playingField;
