import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ListFilterItem extends Component {

	static propTypes = {
		CustomListItem: PropTypes.func,
		listClasses: PropTypes.object,
		onClick: PropTypes.func,
		option: PropTypes.string,
		selected: PropTypes.bool
	}

	static defaultProps = {
		CustomListItem: null,
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
			CustomListItem,
			listClasses,
			option,
			selected,
			style
		} = this.props;

		const liClasses = classNames(
			'apm-list-filter-menu-li',
			{
				[listClasses.item]: !!listClasses.item,
				'apm-list-filter-menu-li-highlight': selected
			}
		);

		return (
			<li
				className={liClasses}
				onClick={this.onClick}
				onMouseOver={this.onMouseOver}
				style={style}
			>
				{ typeof CustomListItem === 'function' && React.isValidElement(<CustomListItem />) 
					? <CustomListItem option={option} />
					: !!option && typeof option === 'object' ? option.name : option
				}
			</li>
		);
	}
}

export default ListFilterItem;
