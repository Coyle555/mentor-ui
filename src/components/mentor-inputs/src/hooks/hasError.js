export function hasError(value, required, customValidators) {
	if (!value && !!required) {
		return true;
	}

	if (!!customValidators && !Array.isArray(customValidators)) {
		customValidators = [customValidators];
	}

	if (value.length > 0 && !!customValidators && customValidators.length > 0) {
		for (let validator of customValidators) {
			if (typeof validator === 'function' && !validator(value)) {
				return true;
			}
		}
	}

	return false;
}
