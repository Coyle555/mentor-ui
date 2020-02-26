
export function createDragPreview(selectedRows) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	ctx.font = '48px serif';
	ctx.fillText('Hello World', 10, 50);

	return canvas.toDataURL();
}
