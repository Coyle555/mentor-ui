import React from 'react';
import PropTypes from 'prop-types';

export const Field = ({
	canGoLeft,
	canGoRight,
	canSubmit,
	handleGoingLeft,
	handleGoingRight,
	InputComponent,
	linkedProps,
	value,
	_onSubmit
}) => {
	let inputProps = {
		...linkedProps,
		'data-testid': 'field-input',
		value
	};

	return (
		<div className="row">
			<div className="col-2 text-right">
				{ canGoLeft && 
					<button
						className="nav-btn"
						onClick={handleGoingLeft}
					>
						<i className="far fa-chevron-left fa-2x" />
						<br />
						Back
					</button>
				}
			</div>
			<div className="col-8">
				{ !!InputComponent && React.cloneElement(InputComponent, inputProps) }
			</div>
			<div className="col-2">
				{ canGoRight &&
					<button
						className="nav-btn"
						onClick={handleGoingRight}
					>
						<i className="far fa-chevron-right fa-2x" />
						<br />
						Next
					</button>
				}
				{ canSubmit &&
					<button
						className="nav-btn nav-btn-submit"
						onClick={_onSubmit}
					>
						<i className="far fa-check fa-2x" />
						<br />
						Submit
					</button>
				}
			</div>
		</div>
	);
};

Field.propTypes = {
	canGoLeft: PropTypes.bool,
	canGoRight: PropTypes.bool,
	canSubmit: PropTypes.bool,
	handleGoingLeft: PropTypes.func,
	handleGoingRight: PropTypes.func,
	InputComponent: PropTypes.element,
	link: PropTypes.shape({
		valid: PropTypes.bool,
		onLink: PropTypes.func
	}),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	_onSubmit: PropTypes.func
};

Field.defaultProps = {
	canGoLeft: false,
	canGoRight: false,
	canSubmit: false,
	handleGoingLeft: null,
	handleGoingRight: null,
	InputComponent: null,
	link: {},
	value: '',
	_onSubmit: null
};
