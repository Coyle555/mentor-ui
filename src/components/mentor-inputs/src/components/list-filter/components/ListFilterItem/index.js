import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class ListFilterItem extends Component {

	static propTypes = {
		index: PropTypes.number,
		listClasses: PropTypes.object,
		onClick: PropTypes.func,
		onMouseOver: PropTypes.func,
		option: PropTypes.string,
		selected: PropTypes.bool,
		style: PropTypes.object
	}

	static defaultProps = {
		listClasses: {},
		selected: false
	}

	onClick = (event) => {
		event.stopPropagation();

		this.props.onClick(this.props.option);
	}

	onMouseOver = () => {
		this.props.onMouseOver(this.props.index);
	}

	render() {
		const {
			listClasses,
			option,
			selected,
			style
		} = this.props;

		const liClasses = classNames(
			'mui-list-filter-menu-li',
			{
				[listClasses.item]: !!listClasses.item,
				'mui-list-filter-menu-li-highlight': selected
			}
		);

		return (
			<li
				className={liClasses}
				onClick={this.onClick}
				onMouseOver={this.onMouseOver}
				style={style}
			>
				{!!option && typeof option === 'object' && option.title
					? option.title
					: option
				}
				{!!option && typeof option === 'object' && option.subtitle
					&& <>
						<br />
						<span className="subtitle">
							{option.subtitle}
						</span>
					</>
				}
			</li>
		);
	}
}
