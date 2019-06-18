import { get, hasIn } from 'lodash';

/*
	let params = getParams() //--> { id: 123, foreignKey: { id: 125 }};
	
	Works with routes following below format:

	injectRouteWithParams('/user/:id', getParams);
		'/user/123';

	injectRouteWithParams('/user?id=:id', getParams) 
		'/user?id=123';

	injectRouteWithParams('/role/:foreignKey.id')
		'/role/125'

	injectRouteWithParams('/userroles?role=:foreignKey.id&userId=:id', getParams) 
		'/userroles?role=125&userId=123';
	
	Otherwise the original route is returned
*/

export const injectRouteWithParams = function(route, getParams) {
	const original = route;
	const regex = /(\=|\/)(\:(\w*\.{0,1}\w*))/;

	let params = typeof getParams === 'function' ? getParams() : getParams;

	if (!params || !regex.test(route)) {

		return route;
	}

	if (!params || typeof params !== 'object') {
		console.warn('asyncFilter < injectRouteWithParams : invalid params');
		return route;
	}

	// counter for sanity check
	let i = 0;

	let regexResults = regex.exec(route);

	while (regexResults) {
		i += 1;

		if (i >= 20) {
			console.warn('asyncFilter < injectRouteWithParams :',
					'an infinite loop was just prevented'
				);
			console.info({ params, route, originalRoute: original });
			return original;
		} 

		// if the string doesnt point to a valid path on the params object
		// the data model doesnt match so break the loop, log a warning, and return 
		// the original route
		if (!hasIn(params, regexResults[3])) {
			console.warn('asyncFilter < injectRouteWithParams :', 
				'Invalid route ', original, '. ', 
				regexResults[3], ' is not a path on data model: ', 
			);
			console.log(params);
			return original;
		}

		let actualValue = get(params, regexResults[3], null);
		if (actualValue && typeof actualValue === 'object' && actualValue.id) {
			actualValue = actualValue.id;
		}

		route = route.replace(regex, "$1" + actualValue, "$2");
		regexResults = regex.exec(route);
	}

	return route;

}