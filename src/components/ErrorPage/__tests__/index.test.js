import React from 'react';
import renderer from 'react-test-renderer';
import { ErrorPage } from '../index';

describe('Error Page', () => {
	test('something went wrong status', () => {
		const tree = renderer.create(<ErrorPage />).toJSON();
		expect(tree).toMatchSnapshot();
	})
	test('route not found status', () => {
		const tree = renderer.create(<ErrorPage status={400} />).toJSON();
		expect(tree).toMatchSnapshot();
	})
	test('unauthorized status', () => {
		const tree = renderer.create(<ErrorPage status={401} />).toJSON();
		expect(tree).toMatchSnapshot();
	})
	test('forbidden status', () => {
		const tree = renderer.create(<ErrorPage status={403} />).toJSON();
		expect(tree).toMatchSnapshot();
	})
	test('resource not found status', () => {
		const tree = renderer.create(<ErrorPage status={404} />).toJSON();
		expect(tree).toMatchSnapshot();
	})
	test('server error status', () => {
		const tree = renderer.create(<ErrorPage status={500} />).toJSON();
		expect(tree).toMatchSnapshot();
	})
	test('resource not found status', () => {
		const tree = renderer.create(<ErrorPage status={502} />).toJSON();
		expect(tree).toMatchSnapshot();
	})
});
