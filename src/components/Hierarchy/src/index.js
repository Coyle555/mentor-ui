import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';

import { Row } from './components/Row';

import './styles.less';

const ROW_HEIGHT = 62;


export const Tree = ({ nodeCount, nodes, isVirtualized }) => { 

	const renderRow = ({ index, key, style }) => (
		<div
			className="mui-node-row"
			key={key}
			style={style}
		>
			<div className="mui-node-handler">
			</div>
			<div className="mui-node-content">
				{nodes[index].title}
			</div>
		</div>
	);

	if (isVirtualized) {
		return (
			<AutoSizer>
				{({ height, width }) => {
					console.log('rendering', height, width);
					return <List
						className="mui-hierarchy-node"
						height={1000}
						rowCount={nodeCount}
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
	nodes: PropTypes.array
}

Tree.defaultProps = {
	isVirtualized: true,
	nodeCount: 0,
	nodes: []
};
