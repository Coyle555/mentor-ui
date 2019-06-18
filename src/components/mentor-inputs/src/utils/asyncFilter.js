import { toast } from 'react-toastify';
import { injectRouteWithParams } from './injectRouteWithParams';
// an async filter for loading in 100 records at a time from the backend
// the filter will search the name field on the backend using a general wildcard
// of {value}% to find any names that start with value and having any characters
// after it; once it gets the result it will pluck the id and name from the 
// results, if the original result is needed; see the 2nd argument
//
// @route(string): the api route to hit on the backend
// @getParams(func): an optional getter function that returns an object
//		This is similar to using req.allParams() on the backend.
//		except we're injecting params into a route, not extracting them. If a 
//		route has a char : then the route argument will be injected with the returned params 
//
// @return([object]): a list of options with the option id, name, and, 
// 	optionally, the original option result returned

export function asyncFilter(route = '', getParams) {

	if (typeof route !== 'string') {
		console.log({ BAD_ROUTE: route });
		return;
	}

	if (route.charAt(0) !== '/') {
		route = '/' + route;
	}

	const xhr = new XMLHttpRequest();

	return function(value) {
		if (!value || typeof value !== 'string') {
			value = '';
		}

		let newRoute = injectRouteWithParams(route, getParams);

		if (value && typeof value === 'object') {
			value = value.name;
		}

		newRoute += (route.indexOf('?') > -1 ? '&' : '?') +
			`name={"contains":"${(value).toString()}"}&select=id,name&sort=name ASC`;

		return new Promise((resolve, reject) => {

			xhr.open('GET', newRoute);

			xhr.onload = function() {
				if (!xhr.response) return [];

				const response = JSON.parse(xhr.response);

				if (response.Status === 200) {
					const optionsCount = {};	// keep track of duplicate names
					let id;
					let name;

					const options = [];
					
					response.Value.forEach(val => {
						id = val.id;
						name = val.name;

						// a reference in the name will be plucked out; 
						// dont blame me this is dees fault
						if (typeof name === 'object') {
							id = val.name.id;
							name = val.name.name;
						}

						if (optionsCount[name]) {
							optionsCount[name] += 1;
							//return { id: val.id, name: `${name} (${optionsCount[name]})` };
							toast(
								`Hitting ${route} found duplicated name in the data set. ${name} with ${val.id} is being removed from the list of options in the filter. Please fix this data.`,
								{ type: 'error', autoClose: false }
							);
						} else {
							optionsCount[name] = 1;
							options.push({ id, name });
						}
					});

					resolve(options);

				} else {
					const message = response.Message || response.message;
					
					toast.error(message);
	
					resolve([]);
				}
			};

			xhr.onerror = function() {
				const message = resData.Message || resData.message;
				
				toast.error(messag);

				resolve([]);
			};

			xhr.send();
		});
	}
}


