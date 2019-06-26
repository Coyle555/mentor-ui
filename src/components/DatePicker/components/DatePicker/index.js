import cn from 'classnames';
import moment from 'moment';
import React, {
	useState,
} from 'react';
import PropTypes from 'prop-types';

import { Calendar } from '../Calendar';
import { Time } from '../Time';
import { TabNav } from '../TabNav';
import {
	OptionalControl
} from './components/OptionalControl';
import { composeNamespace } from 'compose-namespace';

import './style.less';
import * as utils from './utils';

const tabDisabled = {
	cursor: 'default',
	width: '100%'
};

const TAB_LABELS = Object.freeze({
	time: 'Time',
	date: 'Date',
})

const TAB_OPTIONS = Object.freeze([
	{
		label: TAB_LABELS.date,
		iconClass: 'fal fa-calendar-alt',
	},
	{
		label: TAB_LABELS.time,
		iconClass: 'fal fa-clock',
	},
])

export function DatePicker(props) {
	const {
		moment: m,
		className,
		clearInput,
		dateDisabled,
		handleClose,
		minDate,
		maxDate,
		minHour,
		maxHour,
		minMinute,
		maxMinute,
		saveDate,
		timeDisabled,
		onChange,
	} = props;

	const [activeTab, setActiveTab] = useState(TAB_LABELS.date);

	const cc = composeNamespace('APMDatePicker', className);

	return (
		<div className={cc()}>
			<div className={cc('optional-controls')}>
				<div className={cc('optional-controls-main')}>
					{ utils.isCallbackValid(saveDate) ||
						<OptionalControl
							onClick={saveDate}
							iconClass='fal fa-save'
						>
							Save
						</OptionalControl>
					}
					{ utils.isCallbackValid(clearInput) &&
						<OptionalControl
							onClick={clearInput}
							iconClass='fal fa-empty-set'
						>
							Clear
						</OptionalControl>
					}
				</div>
				{ utils.isCallbackValid(handleClose) &&
					<OptionalControl
						onClick={saveDate}
						iconClass='fal fa-times'
						className={cc('optional-controls-orphan')}
					/>
				}
			</div>
			<TabNav
				className={cc('nav')}
				tabs={TAB_OPTIONS}
				activeTab={activeTab}
				onClick={onTabClick(setActiveTab)}
			/>
			<div className="tabs">
				{ !dateDisabled &&
					<Calendar
						className={cn(
							'tab',
							{ 'is-active': activeTab === TAB_LABELS.date }
						)}
						maxDate={maxDate}
						minDate={minDate}
						moment={m}
						onChange={onChange}
					/>
				}
				{ !timeDisabled && activeTab === TAB_LABELS.time &&
					<Time
						minHour={minHour}
						maxHour={maxHour}
						minMinute={minMinute}
						maxMinute={maxMinute}
						moment={m}
						onChange={onChange}
					/>
				}
			</div>
		</div>
	);
};

function onTabClick(setActiveTab) {
	return (label) => {
		setActiveTab(label);
	};
};

DatePicker.propTypes = {
	clearInput: PropTypes.func,
	isDateDisabled: PropTypes.bool,
	handleClose: PropTypes.func,
	minHour: PropTypes.number,
	maxHour: PropTypes.number,
	minMinute: PropTypes.number,
	maxMinute: PropTypes.number,
	saveDate: PropTypes.func,
	isTimeDisabled: PropTypes.bool
};

DatePicker.defaultProps = {
	clearInput: null,
	dateDisabled: false,
	handleClose: null,
	minDate: null,
	maxDate: null,
	minHour: 0,
	maxHour: 23,
	minMinute: 0,
	maxMinute: 59,
	saveDate: null,
	timeDisabled: false
};
