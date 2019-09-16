import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import classNames from 'classnames';

import { Row } from './components/Row';

import './styles.less';

const ROW_HEIGHT = 62;


export const Tree = ({ isVirtualized, nodeCount, nodes, subtitle }) => { 

	const renderRow = useCallback(({ index, key, style }) => (
		<div
			className="mui-node-row"
			key={key}
			style={style}
		>
			{ nodes[index].childrenCount > 0 && (
				<button
					className={classNames(
						nodes[index].expanded 
							? 'node-collapse-button'
							: 'node-expand-button'
					)}
					type="button"
				>
					{ nodes[index].expanded
						? <i className="fas fa-minus" />
						: <i className="fas fa-plus" />
					}
				</button>
			)}
			<div className="mui-line-block mui-line-half-horizontal-right" />
			<div className="mui-node-handler">
				<div className="node-handler">
					<i className="far fa-bars fa-lg" />
				</div>
			</div>
			<div className="mui-node-content">
				<div className="node-text-title">
					{ nodes[index].title }
				</div>
				<div className="node-text-subtitle">
					{ typeof subtitle === 'function'
						? subtitle(nodes[index])
						: nodes[index].subtitle || ''
					}
				</div>
			</div>
		</div>
	));

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
	nodes: PropTypes.array,
	subtitle: PropTypes.func
}

Tree.defaultProps = {
	isVirtualized: true,
	nodeCount: 0,
	nodes: [],
	subtitle: null
};
