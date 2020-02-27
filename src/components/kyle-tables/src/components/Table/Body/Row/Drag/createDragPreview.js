const CANVAS_WIDTH = 300;
const ROW_HEIGHT = 30;
const ROW_WIDTH = 300;
const ROW_MARGIN = 5;
const TEXT_OFFSET_X = 10;
const TEXT_OFFSET_Y = 5;
const BORDER_WIDTH = 4;

function addRowToCanvas(ctx, row, margin = 0, rowNum = 0) {
	ctx.fillStyle = '#dfe6ee';
	ctx.fillRect(
		0,
		(ROW_HEIGHT * rowNum) + margin,
		ROW_WIDTH,
		ROW_HEIGHT + BORDER_WIDTH + margin
	);

	ctx.setLineDash([8, 6]);
	ctx.strokeStyle = '#2e667e';
	ctx.lineWidth = 4;
	ctx.strokeRect(
		BORDER_WIDTH / 2,
		(ROW_HEIGHT * rowNum) + margin + BORDER_WIDTH / 2,
		ROW_WIDTH - BORDER_WIDTH,
		ROW_HEIGHT + margin
	);

	console.log('text offset y', TEXT_OFFSET_Y + (ROW_HEIGHT * rowNum) + margin);
	ctx.fillStyle = '#313531';
	ctx.font = '26px sans-serif';
	ctx.textBaseline = 'top';
	ctx.fillText(
		row.id,
		TEXT_OFFSET_X,
		TEXT_OFFSET_Y + (ROW_HEIGHT * rowNum) + margin,
		ROW_WIDTH - BORDER_WIDTH - TEXT_OFFSET_X
	);
}

export function createDragPreview({ preview, row, selectedRows }) {
	const rowIds = Object.keys(selectedRows);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = CANVAS_WIDTH;

	if (rowIds.length > 0) {
		canvas.height = rowIds.length * (ROW_HEIGHT + 4 + ROW_MARGIN) - ROW_MARGIN;

		rowIds.forEach((id, i) => {
			const margin = ROW_MARGIN * i;
			addRowToCanvas(ctx, { id }, margin, i);
		});
	} else {
		canvas.height = ROW_HEIGHT + 4;
		addRowToCanvas(ctx, row);
	}

	return canvas.toDataURL();
}
