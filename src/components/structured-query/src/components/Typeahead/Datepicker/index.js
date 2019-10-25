import React, { Component } from 'react';
import moment from 'moment';

import { DatePicker as Picker } from 'components/DatePicker';

export class DatePicker extends Component {

	handleChange = (newDatetime) => {
		this.props.updateDateValue(newDatetime);
	}

	render() {
		const { clearInput, handleClose, saveDate, type } = this.props;

		return (
			<div className="datepicker">
				<Picker
					handleClose={handleClose}
					onChange={this.handleChange}
					onClearHandler={clearInput}
					onSaveHandler={saveDate}
					type={type}
				/>
			</div>
		);
	}
}
