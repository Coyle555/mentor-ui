import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';

import { Row } from './components/Row';

import './styles.less';

const ROW_HEIGHT = 62;

export const Tree = ({ isVirtualized, nodeCount, nodes, subtitle }) => { 

	/*const convertedTree = useMemo(() => {
		let node = nodes[0];
		const nodes = [node];

		while (Array.isArray(node.children) && node.children.length > 0) {
			node.children += 
		}

		return [];
	}, [nodes]);*/

	const renderRow = useCallback(({ index, key, style }) => {
		const { childrenCount, expanded, level, subtitle, title } = nodes[index];

		return (
			<Row
				childrenCount={childrenCount}
				expanded={expanded}
				hasSibling={index + childrenCount + 1 < nodes.length
					&& nodes[index + childrenCount + 1].level === level}
				isRoot={index === 0}
				key={key}
				level={level}
				node={nodes[index]}
				style={style}
				subtitle={subtitle}
				title={title}
			/>
		);
	});

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
