# Hierarchy

Props | Type | Required | Description
----- | ---- | -------- | -----------
[tree](#tree) | Object | Yes | The tree object describing the hierarchy. See below for format.
canDrag | Boolean | No | Allows nodes in the hierarchy to be dragged. Defaults to false.
customButtons | [[element], Function] | No | Render custom buttons that can be activated on each node. Array must be react elements. Signature *(node) => [element]*
customHandle | Function | No | Renders a custom handler on each node. Signature *(node) => element*
isVirtualized | Boolean | No | Enable windowing of the hierarchy. Defaults to false.
onExpandNode | Function | No | Callback that will receive the children of a node that gets expanded. Signature *(node) => [node]*
onNodeClick | Function | No | Called when a user clicks a node. Signature *(node) => {}*
onTreeChange | Function | No | Callback that receives the new tree when the tree initializes, expands, or collapses. Signature *(tree) => {}*
subtitle | Function | No | Callback to render subtitles. Signature *(node) => string*
nodeStyle | Object or Function(node: Node) => Object | No | An object or a function to call to apply a style to nodes.

### Tree

A tree is an object made up of nodes.

#### Node Format

Each node is constructed with the following attributes:

Attribute | Type | Required | Description
--------- | ---- | -------- | -----------
id | String | Yes | Uniquely identifies the node in the hierarchy
children | Array(*objects*) | Yes | All the children of the node. Each item in the list of children will need to be in the node format
title | String | Yes | Title to display to the user for a node
expanded | Boolean | No | True if the node is expanded.
subtitle | String | No | Subtitle to display to the user for a node *Note: if a subtitle function is passed in, that will take priority*
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
