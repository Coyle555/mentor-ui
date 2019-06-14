import React from 'react';
import { Header } from '../index';
import renderer from 'react-test-renderer';

test('Render of header where is it not collapsed', () => {
	global.getComputedStyle = () => ({ width: 1280 });
	global.innerWidth = 1280;

	const tree = renderer.create(<Header />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render of header where it is collapsed', () => {
	global.getComputedStyle = () => ({ width: 600 });
	global.innerWidth = 600;

	const tree = renderer.create(<Header />).toJSON();

	expect(tree).toMatchSnapshot();
});
