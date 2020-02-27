const CANVAS_WIDTH = 300;
const ROW_HEIGHT = 30;
const ROW_WIDTH = 300;

export function createDragPreview({ preview, row, rowIds, selectedRows }) {
	console.log("drag preview", rowIds);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = CANVAS_WIDTH;
	canvas.height = rowIds.length * ROW_HEIGHT + 4;

	ctx.fillStyle = '#dfe6ee';
	ctx.fillRect(0, 0, ROW_WIDTH, ROW_HEIGHT + 4);

	ctx.setLineDash([8, 6]);
	ctx.strokeStyle = '#2e667e';
	ctx.lineWidth = 4;
	ctx.strokeRect(2, 2, ROW_WIDTH - 4, ROW_HEIGHT);

	ctx.fillStyle = '#313531';
	ctx.font = '26px sans-serif';
	ctx.textBaseline = 'top';
	ctx.fillText(row.id, 10, 5, ROW_WIDTH - 12);

	//ctx.font = '30px serif';
	//ctx.fillText(`Dragging ${rowIds.length} rows`, 0, 50);

	return canvas.toDataURL();
}
