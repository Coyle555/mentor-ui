import React, { Component } from 'react';
import Picker from 'react-datepicker';

export class DatePicker extends Component {

	handleChange = (newDatetime) => {
		console.log('new date', newDatetime);
		//.this.props.updateDateValue(newDatetime);
	}

	render() {
		const { clearInput, handleClose, saveDate, type } = this.props;
				/*dateFormat={getDateFormatForPicker(type)}
				fixedHeight
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				openToDate={inputValue}
				placeholderText={getPlaceholder(type)}
				popperClassName="mui-datepicker-popper"
				popperModifiers={{
					preventOverflow: {
						enabled: true,
						escapeWithReference: false,
						boundariesElement: 'viewport'
					}
				}}
				selected={inputValue}
				shouldCloseOnSelect={false}
				showTimeSelect={type === 'datetime'}
				timeIntervals={15}
				{...props}*/

		return (
			<Picker
				fixedHeight
				onChange={this.handleChange}
				selected={new Date()}
			/>
		);
	}
}
