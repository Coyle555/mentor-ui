import { cloneDeep } from 'lodash';

// clone and initialize columns for proper handling
export function initializeColumns(columns = []) {
	let newColumns = [];

	cloneDeep(columns).forEach(col => {
		if (Array.isArray(col)) {
			const isRequired = col.some(c => c.required);

			col.forEach((c, i, arr) => {
				c.required = !!isRequired;
				c.linkToNext = i < arr.length -1;
				c.linkToPrev = i > 0;

				newColumns.push(c);
			});
		} else {
			newColumns.push(col);
		}
	});

	return newColumns;
};
