import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function getCircleStatus(step, activeStep, index) {
	if (!!step.error) {
		return 'stepper-error';
	} else if (index <= activeStep) {
		return 'stepper-active';
	}

	return 'stepper-default';
}

export class Step extends Component {

	static propTypes = {
		activeStep: PropTypes.number,
		hasNextStep: PropTypes.bool,
		hasPrevStep: PropTypes.bool,
		index: PropTypes.number,
		onClick: PropTypes.func,
		step: PropTypes.object,
		width: PropTypes.string
	}

	static defaultProps = {
		step: {},
		width: '100%'
	}

	onClick = () => {
		this.props.onClick(this.props.index);
	}

	render() {
		const {
			activeStep,
			hasNextStep,
			hasPrevStep,
			index,
			step,
			width
		} = this.props;

		const circleStatus = getCircleStatus(step, activeStep, index);

		const circleStatusClasses = classNames(
			'stepper-step-circle',
			circleStatus,
			{ 'stepper-step-circle-link': step.linkNext || step.linkPrev }
		);

		const leftBarClasses = classNames({
			'stepper-step-left-bar': true,
			'stepper-bar-link-prev': step.linkPrev,
			'stepper-bar-active': index <= activeStep,
			'stepper-bar-default': index > activeStep
		});

		const rightBarClasses = classNames({
			'stepper-step-right-bar': true,
			'stepper-bar-link-next': step.linkNext,
			'stepper-bar-active': index < activeStep,
			'stepper-bar-default': index >= activeStep
		});

		return (
			<div
				className="stepper-step"
				style={{ width }}
			>
				<div
					className={circleStatusClasses}
					data-testid={`stepper-${step.id}`}
					onClick={this.onClick}
				>
					<span className="stepper-step-text">
						{ (index < activeStep && !step.error)
							? <i className="fa fa-check" />
							: (index + 1)
						}
					</span>
				</div>
				<div className={`stepper-step-title ${circleStatus}-title`}>
					{step.title}
				</div>
				{ hasPrevStep && 
					<div className={leftBarClasses} />
				}
				{ hasNextStep && 
					<div className={rightBarClasses} />
				}
			</div>
		);
	}
}
