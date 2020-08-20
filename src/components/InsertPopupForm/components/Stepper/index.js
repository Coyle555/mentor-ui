import React from 'react';
import PropTypes from 'prop-types';

import { Step } from './components/Step';

export const Stepper = ({ activeStep, onClick, steps }) => (
	<div className="stepper-container">
		<div className="stepper">
			{steps.map((step, i) => (
				<Step
					activeStep={activeStep}
					hasNextStep={i !== steps.length - 1}
					hasPrevStep={i !== 0}
					index={i}
					key={step.id}
					onClick={onClick}
					step={step}
					width={`${100 / steps.length}%`}
				/>
			))}
		</div>
	</div>
);

Stepper.propTypes = {
	activeStep: PropTypes.number,
	onClick: PropTypes.func,
	steps: PropTypes.arrayOf(PropTypes.object)
};

Stepper.defaultProps = {
	activeStep: 0,
	steps: []
};
