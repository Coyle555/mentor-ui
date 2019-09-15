import React from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

const ROW_HEIGHT = 62;

export const Tree = ({ nodeCount, nodes, isVirtualized }) => { 
	if (isVirtualized) {
		return (
			<AutoSizer>
				{({ height, width }) => (
					<List
						height={height}
						itemCount={nodeCount}
						itemSize={ROW_HEIGHT}
						width={width}
					>
					</List>
				)}
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
