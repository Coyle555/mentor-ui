import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Hamburger } from '../index';

afterEach(cleanup)

describe('Hamburger component', () => {
	it('Should have open class when isOpen prop', () => {
		const { container } = render(<Hamburger isOpen />)

		expect(container).toMatchSnapshot()
	})

	it('Should not have open class when not isOpen prop', () => {
		const { container } = render(<Hamburger />)

		expect(container).toMatchSnapshot()
	})

	it('Should have a classname that starts with APM', () => {
		const { container } = render(<Hamburger />);
		const className = container.firstChild.className;

		expect(className).toMatch(/APM.*/)
	})
})
