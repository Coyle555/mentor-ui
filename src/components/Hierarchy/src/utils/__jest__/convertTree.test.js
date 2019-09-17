import { convertTree } from '../convertTree';

test('Converting a tree with no nodes', () => {
	expect(convertTree()).toEqual([]);
	expect(convertTree([])).toEqual([]);
});

test('Converting a tree with one node' , () => {
	const tree = [{
		children: [],
		childrenCount: 0,
		expanded: false,
		id: 'foo',
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 0,
		expanded: false,
		level: 0,
		descendants: 0
	}]);
});

test('Converting tree with an expanded child', () => {
	const tree = [{
		children: [{
			id: 'bar',
			children: [],
			childrenCount: 0,
			expanded: false
		}],
		childrenCount: 1,
		expanded: true,
		id: 'foo',
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 1,
		expanded: true,
		level: 0,
		descendants: 1
	}, {
		id: 'bar',
		childrenCount: 0,
		expanded: false,
		level: 1,
		descendants: 0
	}]);
});

test('Converting tree with no expanded child', () => {
	const tree = [{
		children: [{
			id: 'bar',
			children: [],
			childrenCount: 0,
			expanded: false
		}],
		childrenCount: 1,
		expanded: false,
		id: 'foo',
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 1,
		expanded: false,
		level: 0,
		descendants: 0
	}]);
});

test('Converting tree with multiple expanded children', () => {
	const tree = [{
		children: [{
			id: 'bar',
			children: [],
			childrenCount: 0,
			expanded: false
		}, {
			id: 'baz',
			children: [],
			childrenCount: 0,
			expanded: false
		}],
		childrenCount: 2,
		expanded: true,
		id: 'foo',
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 2,
		expanded: true,
		level: 0,
		descendants: 2
	}, {
		id: 'bar',
		childrenCount: 0,
		expanded: false,
		level: 1,
		descendants: 0
	}, {
		id: 'baz',
		childrenCount: 0,
		expanded: false,
		level: 1,
		descendants: 0
	}]);
});

test('Converting a tree with a depth of 3', () => {
	const tree = [{
		children: [{
			id: 'bar',
			children: [{
				id: 'child4',
				childrenCount: 0,
				children: [],
				expanded: false,
			}],
			childrenCount: 1,
			expanded: true
		}, {
			id: 'baz',
			children: [],
			childrenCount: 0,
			expanded: false
		}],
		childrenCount: 2,
		expanded: true,
		id: 'foo',
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 2,
		expanded: true,
		level: 0,
		descendants: 3
	}, {
		id: 'bar',
		childrenCount: 1,
		expanded: true,
		level: 1,
		descendants: 1
	}, {
		id: 'child4',
		childrenCount: 0,
		expanded: false,
		level: 2,
		descendants: 0
	}, {
		id: 'baz',
		childrenCount: 0,
		expanded: false,
		level: 1,
		descendants: 0
	}]);
});
