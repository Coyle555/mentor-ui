import PopperJs from 'popper.js';

/* 
* The following is a mock of popper.js created originally as a solution
*  to tests for the datepicker component.
* Datepicker 
*		case problem: popper.js relies on the actual dom api to call some of it's functions
*			and those APIs will likely never be available with JSDom. This mocks those specific functions
*			and allows the rest of popper's api to pass through
*			more details here: https://github.com/popperjs/popper-core/issues/478
*		symptoms: TypeError: document.createRange is not a function
*/
export default class Popper {
	static placements = PopperJs.placements;

	constructor() {
		return {
			destroy: () => { },
			scheduleUpdate: () => { }
		};
	}
}