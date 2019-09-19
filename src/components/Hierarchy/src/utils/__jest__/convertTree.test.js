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
		descendants: 0,
		expanded: false,
		level: 0,
		parent: null,
		hasSibling: false
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
		parent: null,
		descendants: 1,
		hasSibling: false
	}, {
		id: 'bar',
		childrenCount: 0,
		expanded: false,
		level: 1,
		descendants: 0,
		hasSibling: false,
		parent: {
			id: 'foo',
			childrenCount: 1,
			expanded: true,
			level: 0,
			descendants: 1,
			parent: null,
			hasSibling: false
		}
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
		descendants: 0,
		expanded: false,
		level: 0,
		parent: null,
		hasSibling: false
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
		descendants: 2,
		parent: null,
		hasSibling: false
	}, {
		id: 'bar',
		childrenCount: 0,
		expanded: false,
		descendants: 0,
		hasSibling: true,
		level: 1,
		parent: {
			id: 'foo',
			childrenCount: 2,
			expanded: true,
			level: 0,
			descendants: 2,
			parent: null,
			hasSibling: false
		}
	}, {
		id: 'baz',
		childrenCount: 0,
		expanded: false,
		hasSibling: false,
		descendants: 0,
		level: 1,
		parent: {
			id: 'foo',
			childrenCount: 2,
			descendants: 2,
			expanded: true,
			level: 0,
			parent: null,
			hasSibling: false
		}
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
		descendants: 3,
		level: 0,
		parent: null,
		hasSibling: false
	}, {
		id: 'bar',
		childrenCount: 1,
		expanded: true,
		descendants: 1,
		level: 1,
		hasSibling: true,
		parent: {
			id: 'foo',
			childrenCount: 2,
			expanded: true,
			descendants: 3,
			level: 0,
			parent: null,
			hasSibling: false
		}
	}, {
		id: 'child4',
		childrenCount: 0,
		expanded: false,
		hasSibling: false,
		descendants: 0,
		level: 2,
		parent: {
			id: 'bar',
			childrenCount: 1,
			level: 1,
			descendants: 1,
			hasSibling: true,
			expanded: true,
			parent: {
				id: 'foo',
				descendants: 3,
				childrenCount: 2,
				expanded: true,
				level: 0,
				parent: null,
				hasSibling: false
			}
		}
	}, {
		id: 'baz',
		childrenCount: 0,
		expanded: false,
		level: 1,
		hasSibling: false,
		descendants: 0,
		parent: {
			id: 'foo',
			childrenCount: 2,
			expanded: true,
			level: 0,
			descendants: 3,
			parent: null,
			hasSibling: false
		}
	}]);
});
