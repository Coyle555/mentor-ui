import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ListFilter } from 'mentor-inputs';

const MAX_HEIGHT = 250;

export class ListFilterCell extends PureComponent {

	static propTypes = {
		customFilter: PropTypes.func,
		matchOnEmpty: PropTypes.bool,
		options: PropTypes.arrayOf(
			PropTypes.oneOfType(
				[PropTypes.object, PropTypes.string]
			)
		),
		value: PropTypes.string
	}

	static defaultProps = {
		customFilter: null,
		matchOnEmpty: true,
		options: []
	}

	constructor(props) {
		super(props);

		// @menuBottom: position of the menu bottom in viewport; used
		// 	when the menu will render out of viewport
		// @menuLeft: position of the menu left in viewport
		// @menuTop: position of the menu top in viewport
		// @menuWidth: width of the menu
		this.state = {
			menuBottom: null,
			menuLeft: 0,
			menuTop: 0,
			menuWidth: 100
		};
	}

	componentDidMount() {
		this.updateMenuPosn();
	}

	// check to make sure input hasnt shifted; if it has reset the posn
	// of the menu top/left
	componentDidUpdate() {
		this.updateMenuPosn();
	}

	onChange = (err, val) => {
		if (val.length > 0) {
			this.updateMenuPosn();
		}
	}

	updateMenuPosn = () => {
		const { portalRef } = this.props;
		const menuPosn = this.wrapperRef.getBoundingClientRect();
		const wrapperPosn = portalRef.getBoundingClientRect();
		const left = menuPosn.left - wrapperPosn.left;
		let top = menuPosn.top - wrapperPosn.top + menuPosn.height + portalRef.scrollTop;
		let bottom = null;

		// check if the render could cause the menu to render out of the viewport
		if (menuPosn.bottom + MAX_HEIGHT > wrapperPosn.bottom) {
			bottom = wrapperPosn.bottom - menuPosn.bottom - portalRef.scrollTop + menuPosn.height;
			top = null;
		}

		if (left !== this.state.menuLeft
			|| top !== this.state.menuTop
			|| bottom !== this.state.menuBottom) {

			this.setState({
				menuLeft: left,
				menuTop: top,
				menuWidth: menuPosn.width,
				menuBottom: bottom
			});
		}
	}

	// when user matches on an option
	onMatch = (value, name) => {
		const { onMatch, rowId } = this.props;

		onMatch(rowId, name, value);
	}

	// need to get menu position to absolutely position menu box
	// need to do this to break out of the table flow
	getMenuPosn = (event) => {
		this.updateMenuPosn();
		window.addEventListener('resize', this.updateMenuPosn);
	}

	onBlur = (event) => {
		window.removeEventListener('resize', this.updateMenuPosn);
	}

	render() {
		const {
			customFilter,
			inputClass,
			matchOnEmpty,
			name,
			options,
			portalRef,
			value
		} = this.props;
		const { menuBottom, menuLeft, menuTop, menuWidth } = this.state;

		return (
			<div ref={ref => this.wrapperRef = ref}>
				<ListFilter
					className={inputClass}
					customFilter={customFilter}
					listStyle={{
						container: {
							position: 'absolute',
							bottom: !!menuBottom
								? menuBottom
								: undefined,
							left: menuLeft,
							maxHeight: MAX_HEIGHT,
							top: !!menuTop
								? menuTop
								: undefined,
							width: menuWidth,
							zIndex: 3
						}
					}}
					matchOnEmpty={matchOnEmpty}
					name={name}
					onFocus={this.getMenuPosn}
					onBlur={this.onBlur}
					onMatch={this.onMatch}
					options={options}
					portalRef={portalRef}
					value={value}
				/>
			</div>
		);
	}
};
