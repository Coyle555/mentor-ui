import cn from 'classnames';
import Moment from 'moment';
import React, {
	useState,
	useRef,
	useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { Calendar } from '../Calendar';
import { Time } from '../Time';
import { TabNav } from 'components/TabNav';
import { OptionalControl } from './components/OptionalControl';
import { composeNamespace } from 'compose-namespace';

import './style.less';

export const TYPES = Object.freeze({
	time: 'time',
	date: 'date',
	datetime: 'datetime',
});

const TAB_OPTIONS = Object.freeze([
	{
		label: TYPES.date,
		iconClass: 'fal fa-calendar-alt',
	},
	{
		label: TYPES.time,
		iconClass: 'fal fa-clock',
	},
]);

const DEFAULT_FORMAT_MASKS = Object.freeze({
	[TYPES.datetime]: 'MMM DD, YYYY - hh:mm a',
	[TYPES.date]: 'MMM DD, YYYY',
	[TYPES.time]: 'hh:mm a'
});


export function DatePicker(props) {
	const {
		className,
		format,
		type,
		moment,
		onClearHandler,
		onCloseHandler,
		minDate,
		maxDate,
		minHour,
		maxHour,
		minMinute,
		maxMinute,
		onSaveHandler,
		onChange,
	} = props;

	const [activeTab, setActiveTab] = useState(getInitialType(TYPES, type));

	const propsMomentRef = useRef(moment);
	const [m, setM] = useState(moment
		? moment.clone()
		: new Moment().hour(0).minute(0)
	);

	const [isDateDisabled, isTimeDisabled] = getIsDisabled(TYPES, type);

	const cc = composeNamespace('APMDatePicker', className);

	/**
	 * Causes the DatePicker to rerender when a new moment
	 * object is passed in. The use case for this is when
	 * DatePicker should reflect an external input (see
	 * DatePickerComposed).
	 */
	useEffect(() => {
		if (propsMomentRef.current !== moment && moment instanceof Moment) {
			setM(moment)
			propsMomentRef.current = moment;
		}
	}, [moment]);

	return (
		<div className={cc()}>
			<div className={cn(
				cc('optional-controls'),
				{ [cc('optional-controls-timer-spacer')]: isDateDisabled },
				{ [cc('optional-controls-date-spacer')]: isTimeDisabled })
			}>
				<div className={cc('optional-controls-main')}>
					{ isCallbackValid(onSaveHandler) &&
						<OptionalControl
							onClick={onSaveHandler}
							iconClass='fal fa-save'
						>
							Save
						</OptionalControl>
					}
					{ isCallbackValid(onClearHandler) &&
						<OptionalControl
							onClick={onClearCallback(
								onClearHandler,
								setM,
								Moment,
							)}
							iconClass='fal fa-empty-set'
						>
							Clear
						</OptionalControl>
					}
				</div>
				{ isCallbackValid(onCloseHandler) &&
					<OptionalControl
						onClick={onCloseHandler}
						iconClass='fal fa-times'
						className={cc('optional-controls-orphan')}
					/>
				}
			</div>
			{ !isDateDisabled && !isTimeDisabled &&
				<TabNav
					className={cc('nav')}
					tabs={TAB_OPTIONS}
					activeTab={activeTab}
					onClick={onTabClick(setActiveTab)}
				/>
			}
			{ activeTab === TYPES.date && !isDateDisabled
				&& <Calendar
					maxDate={maxDate}
					minDate={minDate}
					moment={m}
					onChange={onChangeCallback(
						onChange,
						isFormatValid(format, m)
							? format
							: DEFAULT_FORMAT_MASKS[type],
						setM,
					)}
				/>
			}
			{ activeTab === TYPES.time && !isTimeDisabled
				&& <Time
					minHour={minHour}
					maxHour={maxHour}
					minMinute={minMinute}
					maxMinute={maxMinute}
					moment={m}
					onChange={onChangeCallback(
						onChange,
						isFormatValid(format, m)
							? format
							: DEFAULT_FORMAT_MASKS[type],
						setM,
					)}
				/>
			}
		</div>
	);
};

export function getIsDisabled(types, type) {
	return [
		type === TYPES.time,
		type === TYPES.date,
	]
}

export function getInitialType(types, type) {
	switch (type) {
		case types.datetime:
			return types.date;
		case types.date:
			return types.date;
		case types.time:
			return types.time;
		default:
			return types.date;
	};
};

export function isFormatValid(format, m) { // m = moment
	return typeof format === 'string'
		&& m.format(format) !== format
		&& format.match(/\d/) === null
}

export function onChangeCallback(onChange, mask, setM) {
	return (m) => { // m = moment
		const value = m.format(mask);

		setM(m.clone());
		onChange(value);
	}
}

export function onClearCallback(onClear, setM, Moment) {
	return () => {
		onClear();
		setM(new Moment());
	}
};

export function onTabClick(setActiveTab) {
	return (label) => {
		setActiveTab(label);
	};
};

export const isCallbackValid = (callback) => {
	return typeof callback === 'function';
};

DatePicker.propTypes = {
	onClearHandler: PropTypes.func,
	onCloseHandler: PropTypes.func,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
	minHour: PropTypes.number,
	maxHour: PropTypes.number,
	minMinute: PropTypes.number,
	maxMinute: PropTypes.number,
	onSaveHandler: PropTypes.func,
	onChange: PropTypes.func,
	type: PropTypes.string.isRequired,
};

DatePicker.defaultProps = {
	onClearHandler: null,
	onCloseHandler: null,
	minDate: null,
	maxDate: null,
	minHour: 0,
	maxHour: 23,
	minMinute: 0,
	maxMinute: 59,
	onSaveHandler: null,
	type: 'datetime'
};
