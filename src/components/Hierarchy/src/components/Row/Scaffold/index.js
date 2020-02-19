import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Scaffold = ({ level, nodeIndex, tree }) => {
	return new Array(level + 1).fill(null).map((val, i) => {
		let currentNode = tree[nodeIndex];
		let currentLevel = level;

		// need to get the ancestor for the node at the level being processed
		// for the scaffolding
		while (currentLevel !== i) {
			currentNode = tree[currentNode.parent];
			currentLevel--;
		}

		const isVertical = !!currentNode && currentNode.hasSibling;

		const classes = classNames({
			'mui-line-block': true,
			'mui-line-half-horizontal-right': i === level,
			'mui-line-half-vertical-top': !isVertical && i === level && i > 0,
			'mui-line-full-vertical': isVertical
		});

		return (
			<div
				className={classes}
				data-i={i}
				key={'scaffold' + currentNode.id + i}
			/>
		);
	});
};

Scaffold.propTypes = {
	level: PropTypes.number,
	nodeIndex: PropTypes.number,
	tree: PropTypes.arrayOf(PropTypes.object)
};
