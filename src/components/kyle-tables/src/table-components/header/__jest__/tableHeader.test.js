import React from 'react';
import { TableHeader } from '../tableHeader';
import renderer from '@testing-library/react';

test('Default render of a table header', () => {
	const tree = renderer.create(<TableHeader />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Table header with a custom class', () => {
	const tree = renderer.create(<TableHeader customClasses={{ tableHeader: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});
