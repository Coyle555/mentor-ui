import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import fuzzy from 'fuzzy';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import { DatePicker } from 'mentor-inputs';

export class TableDatePicker extends PureComponent {

	static propTypes = {
		value: PropTypes.string
	}

	constructor(props) {
		super(props);

		// @menuLeft: position of the menu left in viewport
		// @menuTop: position of the menu top in viewport
		this.state = {
			menuLeft: 0,
			menuTop: 0
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

	updateMenuPosn = () => {
		const menuPosn = this.wrapperRef.getBoundingClientRect();
		const left = menuPosn.left;
		const top = menuPosn.top + window.scrollY + menuPosn.height;

		if (left !== this.state.menuLeft || top !== this.state.menuTop) {
			this.setState({
				menuLeft: left,
				menuTop: top
			});
		}
	}

	// need to get menu position to absolutely position menu box
	// need to do this to break out of the table flow
	getMenuPosn = (event) => {
		const menuPosn = this.wrapperRef.getBoundingClientRect();

		this.setState({
			menuLeft: menuPosn.left,
			menuTop: menuPosn.top + window.scrollY + menuPosn.height
		});

		window.addEventListener('resize', this.updateMenuPosn);
	}

	_onBlur = (error, value, name) => {
		const updateData = { [name]: value };
		this.props.onBlur(this.props.rowId, updateData);

		window.removeEventListener('resize', this.updateMenuPosn);
	}

	render() {
		const {
			inputClass,
			name,
			onBlur,
			portalRef,
			required,
			value
		} = this.props;
		const { menuLeft, menuTop } = this.state;

		return (
			<div ref={ref => this.wrapperRef = ref}>
				<input />
				{/*<DatePicker
					className={inputClass}
					name={name}
					onBlur={this._onBlur}
					pickerStyle={{
						container: {
							position: 'absolute',
							left: menuLeft,
							top: menuTop,
							zIndex: 1
						}
					}}
					portalRef={portalRef}
					required={required}
					value={value}
				/>*/}
			</div>
		);
	}
};
