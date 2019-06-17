import React, { Component } from 'react';
import moment from 'moment';
import Picker from 'mentor-inputs/src/components/datepicker/input-moment/input-moment';

export class DatePicker extends Component {

	constructor(props) {
		super(props);

		this.state = {
			datetime: moment()
		};
	}

	componentDidMount() {
		const { datetime } = this.state;

		this.props.updateDateValue(datetime.format('YYYY-MM-DD HH:mm'));
	}

	handleChange = (newDatetime) => {
		this.setState({ datetime: newDatetime });

		this.props.updateDateValue(newDatetime.format('YYYY-MM-DD HH:mm'));
	}

	render() {
		const { clearInput, handleClose, saveDate } = this.props;
		const { datetime } = this.state;

		return (
			<div className="datepicker">
				<Picker
					clearInput={clearInput}
					handleClose={handleClose}
					moment={datetime}
					onChange={this.handleChange}
					saveDate={saveDate}
				/>
			</div>
		);
	}
}
