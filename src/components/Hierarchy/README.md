Props | Type | Required | Description
----- | ---- | -------- | -----------
canDrag | Boolean | No | Allows nodes in the hierarchy to be dragged. Defaults to false.
customButtons | Function or Array(*React elements*) | No | Render custom buttons that can be activated on each node. Array must be react elements. Function signature is (node) => {}
customHandle | Function | No | Renders a custom handler on each node. Function signature is (node) => {}
isVirtualized | Boolean | No | Enable windowing of the hierarchy. Defaults to false.
onExpandNode | Function | No | Callback that will receive the children of a node that gets expanded. Function signature is (node) => {}
tree | Object | Yes | The tree object describing the hierarchy. See below for format.
subtitle | Function | No | Callback to render subtitles. Function signature is (node) => {}

### Tree format

#### Node Format

Each node is constructed with the following attributes:

Attribute | Type | Required | Description
--------- | ---- | -------- | -----------
expanded | Boolean | No | True if the node is expanded.
id | String | Yes | Uniquely identifies the node in the hierarchy
title | Strng | Yes | Title to display to the user for a node
subtitle | String | No | Subtitle to display to the user for a node *Note: if a subtitle function is passed in, that will take priority*
children | Array(*objects*) | Yes | All the children of the node. Each item in the list of children will need to be in the node format
childrenCount | Number | No | Can be used to signal there are children of a node that do not exist in the tree(Used for async operations)


Any extra attributes passed in on a node object are merged in to the node.

#### Example

```
{
	expanded: true,
	id: 'root',
	title: 'Root',
	subtitle: 'Root subtitle',
	children: [{
		expanded: false,
		id: 'foo',
		title: 'Foo',
		subtitle: 'Foo subtitle'
		children: []
	}]
}
```
