const CANVAS_WIDTH = 300;
const ROW_HEIGHT = 32;
const ROW_WIDTH = 300;
const ROW_MARGIN = 5;
const TEXT_OFFSET_X = 7;
const TEXT_OFFSET_Y = 6;
const BORDER_WIDTH = 2;
const MAX_TEXT_WIDTH = ROW_WIDTH - TEXT_OFFSET_X - BORDER_WIDTH;
const ELLIPSIS = '...';

function addRowToCanvas(ctx, previewText, margin = 0, rowNum = 0) {
	// add a rectangle for a row
	ctx.fillStyle = '#dfe6ee';
	ctx.fillRect(
		0,
		(ROW_HEIGHT * rowNum) + margin,
		ROW_WIDTH,
		ROW_HEIGHT
	);

	// create a stroke around the rectangle
	ctx.setLineDash([8, 6]);
	ctx.strokeStyle = '#2e667e';
	ctx.lineWidth = 2;
	ctx.strokeRect(
		BORDER_WIDTH / 2,
		(ROW_HEIGHT * rowNum) + margin + BORDER_WIDTH / 2,
		ROW_WIDTH - BORDER_WIDTH,
		ROW_HEIGHT - BORDER_WIDTH
	);

	// add text into the rectangle
	ctx.fillStyle = '#313531';
	ctx.font = '24px sans-serif';
	ctx.textBaseline = 'top';
	let textWidth = ctx.measureText(previewText).width;
	
	// if text is too long; truncate it till it fits and add an ellipsis
	if (textWidth > MAX_TEXT_WIDTH) {
		const ellipsisWidth = ctx.measureText(ELLIPSIS).width;

		while (textWidth + ellipsisWidth > MAX_TEXT_WIDTH && previewText.length > 0) {
			previewText = previewText.substring(0, previewText.length - 1);
			textWidth = ctx.measureText(previewText).width;
		}

		previewText += ELLIPSIS;
	}

	ctx.fillText(
		previewText,
		TEXT_OFFSET_X,
		TEXT_OFFSET_Y + (ROW_HEIGHT * rowNum) + margin
	);
}

export function createDragPreview({ preview, row, selectedRows }) {
	const rowIds = Object.keys(selectedRows);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = CANVAS_WIDTH;

	if (rowIds.length > 0) {
		canvas.height = rowIds.length * (ROW_HEIGHT + ROW_MARGIN) - ROW_MARGIN;

		rowIds.forEach((id, i) => {
			const margin = ROW_MARGIN * i;
			addRowToCanvas(
				ctx,
				typeof preview === 'function'
					? preview(selectedRows[id])
					: id,
				margin,
				i
			);
		});
	} else {
		canvas.height = ROW_HEIGHT;
		addRowToCanvas(
			ctx,
			typeof preview === 'function' ? preview(row) : row.id
		);
	}

	return canvas.toDataURL();
}
