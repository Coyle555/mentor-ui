jest.mock('react-tooltip', () => (props) => <div>{JSON.stringify(props)}</div>);

import React from 'react';
import { StructuredQuery } from '../index';
import { keyEvent } from 'utils';
import { ALL_OPERATIONS } from '../constants';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

describe('Render states of the StructuredQuery', () => {
	
	test('Default render', () => {
		const tree = renderer.create(<StructuredQuery />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Custom container class', () => {
		const tree = renderer.create(<StructuredQuery customClasses={{ container: 'foo' }} />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Export search callback', () => {
		const tree = renderer.create(<StructuredQuery exportSearch={() => {}} />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe('Initial tokens in StructuredQuery', () => {

	test('Initial tokens on mount', () => {
		const instance = renderer.create(
			<StructuredQuery initTokens={[
				{ id: 'foo', label: 'Foo', operator: 'equals', value: 'bar' },
				{ id: 'baz', label: 'Baz', operator: 'is empty' }
			]} />
		).getInstance();

		expect(instance.state.searchTokens).toEqual([
			{ id: 'foo', label: 'Foo', operator: 'equals', value: 'bar' },
			{ id: 'baz', label: 'Baz', operator: 'is empty' }
		]);
	});
	
	test('New tokens passed in', () => {
		const render = renderer.create(
			<StructuredQuery initTokens={[
				{ id: 'foo', label: 'Foo', operator: 'equals', value: 'bar' },
			]} />
		);

		render.update(
			<StructuredQuery initTokens={[
				{ id: 'baz', label: 'Baz', operator: 'is empty' }
			]} />
		);

		expect(render.getInstance().state.searchTokens).toEqual([
			{ id: 'baz', label: 'Baz', operator: 'is empty' }
		]);
	});
	
	test('Invalid tokens on mount', () => {
		const instance = renderer.create(
			<StructuredQuery initTokens={[
				{ label: 'Foo', operator: 'equals', value: 'bar' },
				{ id: 'baz', label: 'Baz', operator: 'equals' }
			]} />
		).getInstance();

		expect(instance.state.searchTokens).toEqual([]);
	});
});

describe('Clearing search in the StructuredQuery', () => {

	test('Clear search', () => {
		const onTokenRemove = jest.fn();

		const instance = renderer.create(
			<StructuredQuery
				initTokens={[{
					id: 'foo',
					label: 'Foo',
					operator: 'equals',
					value: 'bar'
				}]}
				onTokenRemove={onTokenRemove}
			/>
		).getInstance();

		instance.clearSearch();
		expect(instance.state.searchTokens).toEqual([]);
		expect(onTokenRemove).toHaveBeenCalledWith([]);
	});
});

describe('Exporting search in the StructuredQuery', () => {

	test('Export search', () => {
		const exportSearch = jest.fn();

		const instance = renderer.create(
			<StructuredQuery
				exportSearch={exportSearch}
				initTokens={[{
					id: 'foo',
					label: 'Foo',
					operator: 'equals',
					value: 'bar'
				}]}
			/>
		).getInstance();

		instance.exportSearch();
		expect(exportSearch).toHaveBeenCalledWith([{
			id: 'foo',
			label: 'Foo',
			operator: 'equals',
			value: 'bar'
		}]);
	});
});

describe('Handling key down events', () => {

	test('A non backspace key down event', () => {
		const instance = renderer.create(<StructuredQuery />).getInstance();

		expect(instance._onKeyDown({ keyCode: 90 })).toBe(undefined);
	});

	test('A key down event with a value existing', () => {
		const instance = renderer.create(<StructuredQuery />).getInstance();

		expect(instance._onKeyDown({ keyCode: keyEvent.DOM_VK_BACK_SPACE }, 'test')).toBe(undefined);
	});

	test('Removing operator using backspace', () => {
		const instance = renderer.create(<StructuredQuery />).getInstance();

		instance.state.nextToken = { id: 'foo', label: 'Foo', operator: 'equals', value: 'foo' };
		instance._onKeyDown({
			keyCode: keyEvent.DOM_VK_BACK_SPACE,
			preventDefault: jest.fn()
		});

		expect(instance.state.nextToken).toEqual({
			id: 'foo',
			label: 'Foo',
			operator: '',
			value: ''
		});
	});

	test('Removing label using backspace', () => {
		const instance = renderer.create(<StructuredQuery />).getInstance();

		instance.state.nextToken = { id: 'foo', label: 'Foo', operator: '', value: '' };
		instance._onKeyDown({
			keyCode: keyEvent.DOM_VK_BACK_SPACE,
			preventDefault: jest.fn()
		});

		expect(instance.state.nextToken).toEqual({
			id: '',
			label: '',
			operator: '',
			type: '',
			value: ''
		});
	});
});

describe('Adding a field to a token', () => {
	const fields = [
		{ id: 'foo', label: 'Foo', type: 'string' },
		{ id: 'bar', label: 'Bar', type: 'string' }
	];
	
	test('Adding a label to a token', () => {
		const instance = renderer.create(<StructuredQuery fields={fields} />).getInstance();

		instance._addTokenForValue('Foo');
		expect(instance.state.nextToken).toEqual({
			id: 'foo',
			label: 'Foo',
			operator: '',
			type: 'string',
			value: ''
		});
	});

	test('Adding an equals operator to a token', () => {
		const instance = renderer.create(<StructuredQuery fields={fields} />).getInstance();

		instance._addTokenForValue('Foo');
		instance._addTokenForValue(ALL_OPERATIONS.EQUALS);
		expect(instance.state.nextToken).toEqual({
			id: 'foo',
			label: 'Foo',
			operator: ALL_OPERATIONS.EQUALS,
			type: 'string',
			value: ''
		});
	});

	test('Adding a is empty operator to a token', () => {
		const onTokenAdd = jest.fn();
		const instance = renderer.create(
			<StructuredQuery onTokenAdd={onTokenAdd} fields={fields} />
		).getInstance();

		instance._addTokenForValue('Foo');
		instance._addTokenForValue(ALL_OPERATIONS.IS_EMPTY);

		expect(instance.state.nextToken).toEqual({
			id: '',
			label: '',
			operator: '',
			type: '',
			value: ''
		});

		expect(instance.state.searchTokens).toEqual([{
			id: 'foo',
			label: 'Foo',
			operator: ALL_OPERATIONS.IS_EMPTY,
			type: 'string',
			value: ''
		}]);

		expect(onTokenAdd).toHaveBeenCalledWith([{
			id: 'foo',
			label: 'Foo',
			operator: ALL_OPERATIONS.IS_EMPTY,
			type: 'string',
			value: ''
		}]);
	});

	test('Adding a is not empty operator to a token', () => {
		const onTokenAdd = jest.fn();
		const instance = renderer.create(
			<StructuredQuery onTokenAdd={onTokenAdd} fields={fields} />
		).getInstance();

		instance._addTokenForValue('Foo');
		instance._addTokenForValue(ALL_OPERATIONS.IS_NOT_EMPTY);

		expect(instance.state.nextToken).toEqual({
			id: '',
			label: '',
			operator: '',
			type: '',
			value: ''
		});

		expect(instance.state.searchTokens).toEqual([{
			id: 'foo',
			label: 'Foo',
			operator: ALL_OPERATIONS.IS_NOT_EMPTY,
			type: 'string',
			value: ''
		}]);

		expect(onTokenAdd).toHaveBeenCalledWith([{
			id: 'foo',
			label: 'Foo',
			operator: ALL_OPERATIONS.IS_NOT_EMPTY,
			type: 'string',
			value: ''
		}]);
	});

	test('Adding a value to a token', () => {
		const onTokenAdd = jest.fn();
		const instance = renderer.create(
			<StructuredQuery onTokenAdd={onTokenAdd} fields={fields} />
		).getInstance();

		instance._addTokenForValue('Foo');
		instance._addTokenForValue(ALL_OPERATIONS.EQUALS);
		instance._addTokenForValue('testVal');

		expect(instance.state.nextToken).toEqual({
			id: '',
			label: '',
			operator: '',
			type: '',
			value: ''
		});

		expect(instance.state.searchTokens).toEqual([{
			id: 'foo',
			label: 'Foo',
			operator: ALL_OPERATIONS.EQUALS,
			type: 'string',
			value: 'testVal'
		}]);

		expect(onTokenAdd).toHaveBeenCalledWith([{
			id: 'foo',
			label: 'Foo',
			operator: ALL_OPERATIONS.EQUALS,
			type: 'string',
			value: 'testVal'
		}]);
	});

	test('Adding a duplicate token', () => {
		const fields = [
			{ id: 'foo', label: 'Foo', type: 'string', options: [{ name: 'foo' }], parse: val => val.name },
			{ id: 'bar', label: 'Bar', type: 'string' }
		];
		const onTokenAdd = jest.fn();
		const instance = renderer.create(
			<StructuredQuery onTokenAdd={onTokenAdd} fields={fields} />
		).getInstance();

		instance._addTokenForValue('Foo');
		instance._addTokenForValue(ALL_OPERATIONS.EQUALS);
		instance._addTokenForValue({ name: 'foo' });

		instance._addTokenForValue('Foo');
		instance._addTokenForValue(ALL_OPERATIONS.EQUALS);
		instance._addTokenForValue({ name: 'foo' });

		expect(instance.state.searchTokens.length).toBe(1);
	});
});

describe('Removing a token', () => {
	const initTokens = [
		{ id: 'foo', label: 'Foo', operator: 'equals', value: 'bar' },
		{ id: 'baz', label: 'Baz', operator: 'is empty' }
	];

	test('Token not found', () => {
		const instance = renderer.create(
			<StructuredQuery initTokens={initTokens} />
		).getInstance();

		expect(instance._removeTokenForValue({})).toBe(undefined);
	});

	test('Token removed', () => {
		const onTokenRemove = jest.fn();

		const instance = renderer.create(
			<StructuredQuery initTokens={initTokens} onTokenRemove={onTokenRemove} />
		).getInstance();

		instance._removeTokenForValue(initTokens[1]);
		expect(instance.state.searchTokens).toEqual([{
			id: 'foo',
			label: 'Foo',
			operator: 'equals',
			value: 'bar'
		}]);

		expect(onTokenRemove).toHaveBeenCalledWith([{
			id: 'foo',
			label: 'Foo',
			operator: 'equals',
			value: 'bar'
		}]);
	});
});
