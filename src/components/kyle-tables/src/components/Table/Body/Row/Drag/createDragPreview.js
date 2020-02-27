
export function createDragPreview(rows, preview) {
	console.log('dragging rows on preview', rows);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.height = 100;
	canvas.width = 300;

	ctx.font = '30px serif';
	ctx.fillText(`Dragging ${rows.length} rows`, 0, 50);

	return canvas.toDataURL();
}
