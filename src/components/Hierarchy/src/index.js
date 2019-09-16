import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';

import { Row } from './components/Row';

import './styles.less';

const ROW_HEIGHT = 62;

function getChild(node, nodes = []) {
	nodes.push(node);

	if (Array.isArray(node.children) && node.children.length > 0) {
		for (let i = 0; i < node.children.length; i++) {
			nodes.concat(getChild(node.children[i]), nodes);
		}
	}

	return nodes;
}

export const Tree = ({ isVirtualized, nodeCount, nodes, subtitle }) => { 

	/*const convertedTree = useMemo(() => {
		const rootNode = nodes[0];

		return getChild(rootNode);
	}, [nodes]);*/

	const renderRow = useCallback(({ index, key, style }) => (
		<Row
			childrenCount={nodes[index].childrenCount}
			expanded={nodes[index].expanded}
			hasSibling={index + 1 < nodes.length
				&& nodes[index + 1].level === nodes[index].level}
			isRoot={index === 0}
			key={key}
			level={nodes[index].level}
			node={nodes[index]}
			style={style}
			subtitle={nodes[index].subtitle}
			title={nodes[index].title}
		/>
	));

	if (isVirtualized) {
		return (
			<AutoSizer>
				{({ height, width }) => {
					console.log('rendering', height, width);
					return <List
						className="mui-hierarchy-node"
						height={1000}
						rowCount={nodes.length}
						rowHeight={ROW_HEIGHT}
						rowRenderer={renderRow}
						width={1000}
					/>
				}}
			</AutoSizer>
		);
	}

	return <div>Hello</div>;
}

Tree.propTypes = {
	isVirtualized: PropTypes.bool,
	nodeCount: PropTypes.number,
	nodes: PropTypes.array,
	subtitle: PropTypes.func
}

Tree.defaultProps = {
	isVirtualized: true,
	nodeCount: 0,
	nodes: [],
	subtitle: null
};
