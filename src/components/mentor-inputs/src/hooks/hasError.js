export function hasError(value, required, customValidators) {
	if (!value && !!required) {
		return 'Value is required';
	}

	if (!!customValidators && !Array.isArray(customValidators)) {
		customValidators = [customValidators];
	}

	if (typeof value === 'string'
		&& value.length > 0
		&& !!customValidators
		&& customValidators.length > 0) {

		for (let validator of customValidators) {
			if (typeof validator === 'function') {
				const validity = validator(value);
				
				if (typeof validity === 'string') {
					return validity;
				} else if (!validator(value)) {
					return 'An error occurred';
				}
			}
		}
	}

	return false;
}
