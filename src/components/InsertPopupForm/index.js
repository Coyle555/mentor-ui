import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Field, Label, Stepper } from './components/index';
import { Portal } from './components/Portal';
import { keyEvent as KeyEvent } from 'utils';
import { getInputComponent } from './utils';

import './styles/form.less';

export default class InsertForm extends Component {

	static propTypes = {
		formFields: PropTypes.arrayOf(PropTypes.oneOfType([
			PropTypes.shape({
				id: PropTypes.string,
				label: PropTypes.string,
				options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
				parse: PropTypes.func,
				parseMatchedValue: PropTypes.func,
				required: PropTypes.bool,
				type: PropTypes.string
			}),
			PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.string,
				label: PropTypes.string,
				options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
				parse: PropTypes.func,
				parseMatchedValue: PropTypes.func,
				required: PropTypes.bool,
				type: PropTypes.string
			})),
		])).isRequired,
		initInsertData: PropTypes.object,
		onDisable: PropTypes.func,
		onSubmit: PropTypes.func,
		resetForm: PropTypes.bool,
	}

	static defaultProps = {
		formFields: [],
		initInsertData: {},
		onDisable: null,
		onSubmit: null,
		resetForm: false,
	}

	constructor(props) {
		super(props);

		// insertion data taken from the form
		this.insertData = {};

		// @currentInputLabel: the current input label viewable by the user
		// @fieldIndex: index of the current form field that is active
		// @fieldsWithError: keeps track of errors in each field,
		// 	true if there is an error; false otherwise
		// @formModel: describes how the form should display
		// @steps: list of objects where each object describes a step
		// 	in the stepper
		this.state = {
			currentInputLabel: '',
			fieldIndex: 0,
			fieldsWithError: {},
			formModel: [],
			steps: []
		};
	}

	componentDidMount() {
		const { formFields } = this.props;

		if (Array.isArray(formFields) && formFields.length > 0) {
			this.initializeInsertForm();
		}

		window.addEventListener('keydown', this.onKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown = (event) => {
		if (event.keyCode === KeyEvent.DOM_VK_TAB) {
			const { fieldIndex, formModel } = this.state;
			event.preventDefault();
			event.stopPropagation();

			if (event.shiftKey) {
				this.handleGoingLeft();
			} else if (fieldIndex + 1 < formModel.length) {
				this.handleGoingRight();
			}
		} else if (event.keyCode === KeyEvent.DOM_VK_ESCAPE) {
			this.onDisable();
		}
	}

	initializeInsertForm = () => {
		const { formFields, initInsertData } = this.props;

		// initial insertion data to load into the form
		this.insertData = Object.keys(initInsertData).reduce((acc, key) => {
			acc[key] = initInsertData[key] !== null && initInsertData[key] !== undefined
				? initInsertData[key]
				: '';

			return acc;
		}, {});
		const newFormModel = [];
		const newFieldsWithError = {};
		const newSteps = [];

		// initialize insert data
		formFields.forEach(field => {
			if (Array.isArray(field)) {
				const isRequired = field.some(fld => fld.required);

				field.forEach((linkedField, i, arr) => {
					linkedField.required = !!isRequired;
					linkedField.disabled = i > 0;
					linkedField.linkToNext = i < arr.length - 1;
					linkedField.linkToPrev = i > 0;

					const {
						processedField,
						hasError,
						step
					} = this.processField(linkedField);

					newSteps.push(step);
					newFormModel.push(processedField);

					if (hasError) {
						newFieldsWithError[linkedField.id] = true;
					}
				});
			} else {
				const {
					processedField,
					hasError,
					step
				} = this.processField(field);

				newSteps.push(step);
				newFormModel.push(processedField);

				if (hasError) {
					newFieldsWithError[field.id] = true;
				}
			}
		});

		this.setState({
			currentInputLabel: newFormModel.length > 0
				? newFormModel[0].label
				: '',
			fieldIndex: 0,
			fieldsWithError: newFieldsWithError,
			formModel: newFormModel,
			steps: newSteps
		});
	}

	processField = (field) => {
		let hasError = false;
		let step;
		let InputComponent = null;
		
		const inputProps = {
			autoFocus: true,
			className: 'form-input',
			disabled: !!field.disabled,
			key: field.id,
			name: field.id,
			onBlur: this._handleInputBlur,
			onChange: this._handleInputChange,
			onKeyDown: this.onKeyDown,
			onMatch: this._handleOptionMatch,
			required: field.required,
			value: ''
		};

		InputComponent = getInputComponent(field, inputProps);
		
		// initialize insert data if not loaded from props
		if (!this.insertData[field.id]) {
			this.insertData[field.id] = '';
		}

		if (field.required && !this.insertData[field.id]) {
			hasError = true;
		}

		step = {
			id: field.id,
			title: field.label,
			error: hasError,
			linkNext: field.linkToNext,
			linkPrev: field.linkToPrev
		};

		return {
			hasError,
			processedField: Object.assign({}, field, { InputComponent }),
			step
		};
	}

	getField = () => {
		const { fieldIndex, formModel } = this.state;

		return formModel[fieldIndex];
	}

	// handle input after user changes an input form, add new
	// value to current insert data object
	// @error(bool) - true if the field has an error via validation; false 
	// 	otherwise
	// @newValue(string) - new value in the input box
	// @fieldId(string) - id of the form field that was updated
	_handleInputChange = (error, newValue, fieldId) => {
		this.handleValue(newValue, this.state.fieldIndex);
		this.handleFieldError(error, fieldId, newValue, this.state.fieldIndex);
	}

	// handle input after user blurs an input form, add new
	// value to current insert data object
	// @error(bool) - true if the field has an error via validation; false 
	// 	otherwise
	// @newValue(string) - new value in the input box
	// @fieldId(string) - id of the form field that was updated
	_handleInputBlur = (error, newValue, fieldId) => {
		this.handleValue(newValue, this.state.fieldIndex);
		this.handleFieldError(error, fieldId, newValue, this.state.fieldIndex);
	}

	// handle matches in list filter for options
	// @option(string|object) - option that was matched
	// @fieldId(string) - field to assign the match to
	_handleOptionMatch = (option, fieldId) => {
		this.handleValue(option, this.state.fieldIndex);
		this.handleFieldError(false, fieldId, option, this.state.fieldIndex);
	}

	handleValue = (newValue, fieldIndex) => {
		const { formModel } = this.state;
		const field = formModel[fieldIndex];
		let currentVal = this.insertData[field.id];

		if (typeof field.parse === 'function') {
			currentVal = field.parse(this.insertData[field.id]);
		}

		if (newValue !== currentVal) {
			this.insertData[field.id] = newValue;

			// on value changes clear all linked fields
			if (field.linkToNext) {
				this.handleValue('', fieldIndex + 1);
			}
		}
	}

	handleFieldError = (error, fieldId, value, fieldIndex) => {
		const { fieldsWithError, formModel, steps } = this.state;
		const newFieldsWithError = Object.assign({}, fieldsWithError);
		const newSteps = steps.slice();

		if (error || (formModel[fieldIndex].linkToPrev
			&& this.insertData[formModel[fieldIndex - 1].id] !== ''
			&& value === '')) {

			newFieldsWithError[fieldId] = true;
			newSteps[fieldIndex].error = true;

		// if old error is no longer valid, delete it
		} else if (newFieldsWithError[fieldId]) {
			delete newFieldsWithError[fieldId];
			newSteps[fieldIndex].error = false;
		}

		this.setState({
			fieldsWithError: newFieldsWithError,
			steps: newSteps
		}, () => {
			this.handleLinkedFieldError(error, value, fieldIndex);
		});
	}

	handleLinkedFieldError = (error, value, fieldIndex) => {
		const { formModel } = this.state;

		if (formModel[fieldIndex].linkToNext) {
			const nextField = formModel[fieldIndex + 1];

			this.handleFieldError(
				error || (value !== '' && this.insertData[nextField.id] === ''),
				nextField.id,
				this.insertData[nextField.id],
				fieldIndex + 1
			);
		}
	}

	// handle submitting insertion data to the backend
	_onSubmit = () => {
		if (Object.keys(this.state.fieldsWithError).length > 0) {
			return;
		}

		if (typeof this.props.onSubmit === 'function') {
			const dataToSubmit = Object.keys(this.insertData).reduce((acc, fieldId) => {
				acc[fieldId] = this.insertData[fieldId];
				const field = this.state.formModel.find(field => field.id === fieldId);

				if (!!field && typeof field.parseMatchedValue === 'function') {
					acc[fieldId] = field.parseMatchedValue(this.insertData[fieldId]);
				}

				return acc;
			}, {});

			this.props.onSubmit(dataToSubmit);
		}

		if (this.props.resetForm) {
			this.resetForm();
		}
	}

	// resets a form to original state
	resetForm() {
		const { initInsertData } = this.props;
		const { formModel } = this.state;
		const newIndex = 0;
		
		Object.keys(this.insertData).forEach(field => {
			this.insertData[field] = '';
		});

		Object.keys(initInsertData).forEach(field => {
			this.insertData[field] = initInsertData[field] !== null 
				&& initInsertData[field] !== undefined
					? initInsertData[field]
					: '';
		});

		this.setState({
			fieldIndex: newIndex,
			currentInputLabel: formModel[newIndex].label
		});
	}

	// handles going right for fields to be inserted
	handleGoingRight = () => {
		const { fieldIndex, formModel } = this.state;

		// reached end of form
		if (fieldIndex + 1 > formModel.length) return;

		// else move forward in form
		if (fieldIndex + 1 < formModel.length) {
			const newIndex = fieldIndex + 1;

			this.setState({
				currentInputLabel: formModel[newIndex].label,
				fieldIndex: newIndex,
			});
		}
	}

	// handles going left the fields to be inserted
	handleGoingLeft = () => {
		const { formModel, fieldIndex } = this.state;

		let newIndex = fieldIndex - 1;

		if (newIndex < 0) return;

		this.setState({
			currentInputLabel: formModel[newIndex].label,
			fieldIndex: newIndex
		});
	}

	onDisable = () => {
		if (typeof this.props.onDisable === 'function') {
			this.props.onDisable();
		}
	}

	onStepperClick = (index) => {
		const { formModel, fieldIndex } = this.state;

		if (fieldIndex === index) return;

		this.setState({
			currentInputLabel: formModel[index].label,
			fieldIndex: index
		});
	}

	render() {
		const { currentInputLabel, fieldIndex, fieldsWithError, formModel, steps } = this.state;

		if (formModel.length === 0) {
			return null;
		}

		const canGoLeft = (fieldIndex > 0);
		const canGoRight = ((fieldIndex + 1) < this.state.formModel.length);
		const field = this.getField();
		let link;

		if (field.linkToPrev) {
			const prevFieldId = formModel[fieldIndex - 1].id;

			link = {
				disabled: this.insertData[prevFieldId] === ''
					|| fieldsWithError[prevFieldId]
					|| typeof field.onLink !== 'function',
				onLink: field.onLink,
				value: this.insertData[prevFieldId]
			};
		}

		return (
			<Portal>
				<div className="insert-popup-overlay">
					<div className="insert-popup-container">
						<div className="close-form">
							<i
								className="far fa-2x fa-times apm-cursor-p apm-color-red"
								data-testid="disable-form"
								onClick={this.onDisable}
							/>
						</div>
						<div className="layout">
							<div className="form">
								<Label
									label={currentInputLabel}
									required={field.required}
								/>
								<Field
									canGoLeft={canGoLeft}
									canGoRight={canGoRight}
									canSubmit={!canGoRight && Object.keys(fieldsWithError).length === 0}
									handleGoingLeft={this.handleGoingLeft}
									handleGoingRight={this.handleGoingRight}
									InputComponent={field.InputComponent}
									link={link}
									value={this.insertData[field.id]}
									_onSubmit={this._onSubmit}
								/>
							</div>
							<div className="insert-popup-stepper">
								<Stepper 
									activeStep={fieldIndex}
									onClick={this.onStepperClick}
									steps={steps}
								/>
							</div>
						</div>
					</div>
				</div>
			</Portal>
		);
	}
}
