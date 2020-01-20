import { initializeColumns } from '../index';

test('Initializing empty column list', () => {
	expect(initializeColumns()).toEqual([]);
});

test('Initializing column list with no arrays', () => {
	expect(initializeColumns([{ id: 'bar' }, { id: 'foo' }]))
		.toEqual([{ id: 'bar' }, { id: 'foo' }]);
});

test('Initializing column list with arrays', () => {
	expect(initializeColumns([
		{ id: 'bar' },
		{ id: 'foo' },
		[{ id: 'test' }, { id: 'test2' }, { id: 'test3' }]
	])).toEqual([
		{ id: 'bar' },
		{ id: 'foo' },
		{ id: 'test', linkToNext: true, linkToPrev: false, required: false },
		{ id: 'test2', linkToNext: true, linkToPrev: true, required: false },
		{ id: 'test3', linkToNext: false, linkToPrev: true, required: false }
	]);
});

test('Initializing column list with arrays that is required', () => {
	expect(initializeColumns([
		{ id: 'bar' },
		{ id: 'foo' },
		[{ id: 'test' }, { id: 'test2', required: true }, { id: 'test3' }]
	])).toEqual([
		{ id: 'bar' },
		{ id: 'foo' },
		{ id: 'test', linkToNext: true, linkToPrev: false, required: true },
		{ id: 'test2', linkToNext: true, linkToPrev: true, required: true },
		{ id: 'test3', linkToNext: false, linkToPrev: true, required: true }
	]);
});
