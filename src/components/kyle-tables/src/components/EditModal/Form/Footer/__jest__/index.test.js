import React from 'react';
import { Footer } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, render, wait } from '@testing-library/react';

test('Render of the footer with a index out of total count', () => {
	const tree = renderer.create(<Footer currentIndex={1} totalCount={20} />).toJSON();
	expect(tree).toMatchSnapshot();
});
