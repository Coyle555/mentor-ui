/* Takes a main css class for a component and
 * an optional overriding class or classes (array)
 * and returns a function which constructs a class strings.
 *
 *
 * function composeClass(
 * 		string, [
 *    		string of classes,
 *    		single classString,
 *    		Array of classes
 *  	]
 * )
 *
 *
 * For example if given the main class of APMDrawer
 * and the overriding class of className:
 *
 * const cc = composeClass('APMDrawer', 'className');
 *
 * cc('bg') => 'APMDrawer-bg className-bg';
 *
 * cc('bg', 'container') => 'APMDrawer-bg className-bg APMDrawer-containter
 * className-container';
 *
 * const cc = composeClass('mainClass', ['jam', 'cake', 'fig']);
 *
 * cc('jello', 'frosting') => 'mainClass-jello mainClass-frosting jam-jello
 * jam-frosting cake-jello cake-frosting fig-jello fig-frosting'
 */

export function composeClass(mainClass, classPre) {
	if (classPre) {
		let classesPre;

		if (typeof classPre === 'string')
			classesPre = classPre.split(' ').filter(item => item.length > 0);
		else if (Array.isArray(classPre))
			classesPre = classPre;

		return function(...inClasses) {
			if (inClasses.length < 1)
				return `${mainClass} ${classesPre.join(' ')}`;

			inClasses.unshift('');

			return inClasses.join(` ${mainClass}-`)
			+ ' '
			+ classesPre
				.map(classPre => inClasses.join(` ${classPre}-`)
				.substr(1))
				.join(' ')
		}
	} else {
		return function(...inClasses) {
			if (inClasses.length < 1)
				return `${mainClass}`;

			if (inClasses.length > 1) {
				inClasses.unshift('');

				return inClasses.join(` ${mainClass}-`).substr(1);
			}

			return `${mainClass}-${inClasses[0]}`;
		}
	}
}
