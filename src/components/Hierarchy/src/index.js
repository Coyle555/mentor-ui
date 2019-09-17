import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';

import { Row } from './components/Row';
import { convertTree } from './utils/convertTree';

import './styles.less';

const ROW_HEIGHT = 62;

export const Tree = ({ isVirtualized, nodeCount, tree, subtitle }) => { 

	const convertedTree = useMemo(() => convertTree(tree), [tree]);

	console.log('node count', convertedTree.length);
	console.log(convertedTree);

	const renderRow = useCallback(({ index, key, style }) => (
		<Row
			index={index}
			key={key}
			style={style}
			tree={convertedTree}
		/>
	));

	if (isVirtualized) {
		return (
			<AutoSizer>
				{({ height, width }) => (
					<List
						className="mui-hierarchy-node"
						height={1000}
						rowCount={convertedTree.length}
						rowHeight={ROW_HEIGHT}
						rowRenderer={renderRow}
						width={1000}
					/>
				)}
			</AutoSizer>
		);
	}

	return <div>Hello</div>;
}

Tree.propTypes = {
	isVirtualized: PropTypes.bool,
	nodeCount: PropTypes.number,
	tree: PropTypes.array,
	subtitle: PropTypes.func
}

Tree.defaultProps = {
	isVirtualized: true,
	nodeCount: 0,
	tree: [],
	subtitle: null
};
