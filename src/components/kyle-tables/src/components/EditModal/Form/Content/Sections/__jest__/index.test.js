import React from 'react';
import { Sections } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

const fields = [
	{ id: 'foo', label: 'Foo' },
	{ id: 'bar', label: 'Bar' },
	{ id: 'baz', label: 'Baz' }
];

test('Default sections render', () => {
	const tree = renderer.create(<Sections />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Sections render with selected section', () => {
	const tree = renderer.create(<Sections selectedSectionLabel="Fields" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Sections field section clicked', () => {
	const openSection = jest.fn();
	const { getByText } = render(<Sections openSection={openSection} />);

	fireEvent.click(getByText('Fields'));
	expect(openSection).toHaveBeenCalledWith({ content: null, label: 'Fields' });
});

test('Sections with an open list of fields', () => {
	const tree = renderer.create(<Sections fields={fields} fieldsOpen={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Sections list', () => {
	const tree = renderer.create(
		<Sections sections={[{ label: 'foo' }, { label: 'bar' }, { label: 'baz' }]} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Sections list with a highlighted section', () => {
	const tree = renderer.create(
		<Sections
			sections={[{ label: 'foo' }, { label: 'bar' }, { label: 'baz' }]} 
			selectedSectionLabel="foo"
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Section clicked on in the sections list', () => {
	const openSection = jest.fn();
	const { getByText } = render(
		<Sections
			sections={[{ label: 'foo' }, { label: 'bar' }, { label: 'baz' }]}
			openSection={openSection}
		/>
	);

	fireEvent.click(getByText('bar'));
	expect(openSection).toHaveBeenCalledWith({ label: 'bar' });
});
