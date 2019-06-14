// used to generate a drag preview box when user drags row(s)


function getMaxTextWidth(ctx, style, text) {
	let maxWidth = 0;
	let maxTextIndex = -1;

	text.forEach((t, i) => {
		if (t.length > maxWidth) {
			maxWidth = t.length;
			maxTextIndex = i;
		}
	});

	if (typeof ctx.measureText === 'function' && maxTextIndex > -1) {
		return ctx.measureText(text[maxTextIndex]).width;
	} else {
		const perCharWidth = style.fontSize / 1.7
		return maxWidth * perCharWidth;
	}
}

function parseBoxShadow(style) {
	const parts = (style.boxShadow || '').replace(/px/g, '').split(/[^,] /);
	const offsetX = parts[0];
	const offsetY = parts[1];
	const blur = parts[2];
	const color = parts[3];

	return {
		shadowBlur: parseInt(blur, 10) || 0,
		shadowColor: color || 'transparent',
		shadowOffsetX: parseInt(offsetX, 10) || 0,
		shadowOffsetY: parseInt(offsetY, 10) || 0
	};
}

const defaultStyle = {
	backgroundColor: 'rgb(0, 0, 0)',
	borderRadius: 5,
	color: 'white',
	fontSize: 15,
	paddingTop: 10,
	paddingRight: 10,
	paddingBottom: 10,
	paddingLeft: 10
};

const TEXT_OFFSET = 7;

export function createDragPreview(text = [], img) {
	if (text.length === 0) text = ['...'];

	const style = defaultStyle;

	if (!img) img = new Image();

	const shadowStyle = parseBoxShadow(style);
	const marginBottom = shadowStyle.shadowOffsetY + (shadowStyle.shadowBlur * 2);
	const marginRight = shadowStyle.shadowOffsetX + (shadowStyle.shadowBlur * 2);
	const rectHeight = style.paddingTop + (style.fontSize * text.length) + style.paddingBottom;
	const rectStrokeWidth = 1;

	const c = document.createElement('canvas');
	c.height = rectHeight + marginBottom;
	const ctx = c.getContext('2d');

	ctx.font = style.fontSize + 'px sans-serif'; // once before for measurement
	const textWidth = getMaxTextWidth(ctx, style, text);
	const rectWidth = style.paddingLeft + textWidth + style.paddingRight;

	ctx.canvas.width = style.paddingLeft + textWidth + style.paddingRight + marginRight + (rectStrokeWidth * 2);
	ctx.font = style.fontSize + 'px sans-serif'; // once after for actually styling

	ctx.rect(0, 0, rectWidth, rectHeight);

	ctx.save();
	ctx.fillStyle = style.backgroundColor;
	ctx.shadowColor = shadowStyle.shadowColor;
	ctx.shadowBlur = shadowStyle.shadowBlur;
	ctx.shadowOffsetX = shadowStyle.shadowOffsetX;
	ctx.shadowOffsetY = shadowStyle.shadowOffsetY;
	ctx.fill();
	ctx.stroke();
	ctx.restore();

	ctx.fillStyle = style.color;
	text.forEach((t, i) => {
		ctx.fillText(t, style.paddingLeft,
			(style.paddingTop * .75 * (i + 1)) + style.fontSize + (TEXT_OFFSET * i));
	});

	img.src = c.toDataURL();

	return img;
}
