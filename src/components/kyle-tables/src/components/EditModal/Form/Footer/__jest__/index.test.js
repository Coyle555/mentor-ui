import React from 'react';
import { Footer } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

afterEach(cleanup);

test('Render of the footer with a index out of total count', () => {
	const tree = renderer.create(<Footer currentIndex={1} totalCount={20} />).toJSON();
	expect(tree).toMatchSnapshot();
});

test('Render of footer with next button enabled', () => {
	const tree = renderer.create(<Footer currentIndex={1} hasNext={true} totalCount={20} />).toJSON();
	expect(tree).toMatchSnapshot();
});

test('Render of footer with previous button enabled', () => {
	const tree = renderer.create(<Footer currentIndex={1} hasPrevious={true} totalCount={20} />).toJSON();
	expect(tree).toMatchSnapshot();
});

test('Next button onClick', () => {
	const onNextClick = jest.fn();
	const { queryByText } = render(
		<Footer
			currentIndex={1}
			hasNext={true}
			onNextClick={onNextClick}
			totalCount={20}
		/>
	);

	fireEvent.click(queryByText('Next'));
	expect(onNextClick).toHaveBeenCalled();
});

test('Previous button onClick', () => {
	const onPreviousClick = jest.fn();
	const { queryByText } = render(
		<Footer
			currentIndex={1}
			hasPrevious={true}
			onPreviousClick={onPreviousClick}
			totalCount={20}
		/>
	);

	fireEvent.click(queryByText('Previous'));
	expect(onPreviousClick).toHaveBeenCalled();
});
