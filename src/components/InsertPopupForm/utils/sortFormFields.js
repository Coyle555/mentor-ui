// sort the form fields if they have a linked to field
export function sortFormFields(formFields = []) {
	const sortedFormFields = [];
	const movedIds = {};
	// handle the number of shifted elements when splicing since the
	// original array gets out of sync
	let shifted = 0;

	formFields.forEach((field, i) => {
		if (movedIds.hasOwnProperty(field.id)) return;

		if (!field.link || !field.link.to) {
			sortedFormFields.push(field);
			return;
		}

		const linkedFieldIndex = formFields.findIndex(fld => fld.id === field.link.to);

		// linked field is right behind the field
		if (linkedFieldIndex === i - 1) {
			sortedFormFields.push(field);
		// linked field is an arbitrary number of positions behind the field
		} else if (linkedFieldIndex < i - 1) {
			sortedFormFields.splice(linkedFieldIndex + shifted + 1, 0, field);
			shifted++;
		// linked field is in a position before the field it links to
		} else if (linkedFieldIndex > i) {
			sortedFormFields.push(formFields[linkedFieldIndex]);
			sortedFormFields.push(field);
			movedIds[formFields[linkedFieldIndex].id] = true;
		}
	});

	return sortedFormFields;
}
