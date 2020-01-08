import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Field, Label, Stepper } from './components/index';
import { Portal } from './components/Portal';
import { keyEvent as KeyEvent } from 'utils';
import { getInputComponent } from './utils/getInputComponent';

import './styles/form.less';

export default class InsertForm extends Component {

	static propTypes = {
		formFields: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
			parse: PropTypes.func,
			parseMatchedValue: PropTypes.func,
			required: PropTypes.bool,
			type: PropTypes.string
		})).isRequired,
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
		this.idToLabel = {};

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
			} else {
				this._onSubmit();
			}
		} else if (event.keyCode === KeyEvent.DOM_VK_ESCAPE) {
			this.onDisable();
		}
	}

	initializeInsertForm = () => {
		const { formFields } = this.props;

		this.insertData = {};
		const initInsertData = Object.assign({}, this.props.initInsertData);
		const newFormModel = [];
		const newFieldsWithError = {};
		const newSteps = [];

		let InputComponent = null;
		let MentorInput = null;
		let inputProps = {};

		// initialize insert data
		formFields.forEach(field => {
			inputProps = {
				autoFocus: true,
				className: 'form-input',
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
			
			this.insertData[field.id] = '';	// initialize insert data
			this.idToLabel[field.id] = field.label;

			if (Array.isArray(field.dependencies) && field.dependencies.length > 0) {
				const dependentField = formFields.find(fld => fld.id === field.dependencies[0]);

				newFieldsWithError[field.id] = `${dependentField.label} required`;
			} else if (field.required && !initInsertData[field.id]) {
				newFieldsWithError[field.id] = true;
			}

			newSteps.push({
				id: field.id,
				title: field.label,
				error: !!newFieldsWithError[field.id]
			});

			newFormModel.push(Object.assign({}, field, { InputComponent }));
		});

		// initial data passed in to load into the form
		Object.keys(initInsertData).forEach(key => {
			this.insertData[key] = initInsertData[key];
		});

		this.setState({
			currentInputLabel: formFields.length > 0
				? formFields[0].label
				: '',
			fieldIndex: 0,
			fieldsWithError: newFieldsWithError,
			formModel: newFormModel,
			steps: newSteps
		});
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
		this.insertData[fieldId] = newValue;
		this.handleFieldError(error, fieldId);
	}

	// handle input after user blurs an input form, add new
	// value to current insert data object
	// @error(bool) - true if the field has an error via validation; false 
	// 	otherwise
	// @newValue(string) - new value in the input box
	// @fieldId(string) - id of the form field that was updated
	_handleInputBlur = (error, newValue, fieldId) => {
		this.insertData[fieldId] = newValue;
		this.handleFieldError(error, fieldId);
	}

	// handle matches in list filter for options
	// @option(string|object) - option that was matched
	// @fieldId(string) - field to assign the match to
	_handleOptionMatch = (option, fieldId) => {
		this.insertData[fieldId] = option; 
		this.handleFieldError(false, fieldId);
	}

	handleFieldError = (error, fieldId) => {
		const { formFields } = this.props;
		const { fieldIndex, fieldsWithError, steps } = this.state;
		const newFieldsWithError = Object.assign({}, fieldsWithError);
		const newSteps = steps.slice();
		console.log('old error state', newFieldsWithError);

		if (error) {
			newFieldsWithError[fieldId] = true;
			newSteps[fieldIndex].error = true;
		// if old error is no longer valid, delete it
		} else if (newFieldsWithError[fieldId]) {

			delete newFieldsWithError[fieldId];
			newSteps[fieldIndex].error = false;
		// check if any fields are dependent on this field
		} else {
			formFields.forEach((field, i) => {
				if (Array.isArray(field.dependencies) && field.dependencies.includes(fieldId)) {
					delete newFieldsWithError[field.id];
					newSteps[i].error = false;
				}
			});
		}

		console.log('new error state', newFieldsWithError);

		this.setState({
			fieldsWithError: newFieldsWithError,
			steps: newSteps
		});
	}

	checkDependenciesForError = (fieldId) => {
		const { formFields } = this.props;

		formFields.forEach(field => {
			if (Array.isArray(field.dependencies)
				&& field.dependencies.includes(fieldId)) {

				newFieldsWithError[fieldId] = `${field.label} required`;
			}
		});
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
			this.insertData[field] = initInsertData[field];
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
				fieldIndex: newIndex,
				currentInputLabel: formModel[newIndex].label
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
									disabled={typeof fieldsWithError[field.id] === 'string'}
									handleGoingLeft={this.handleGoingLeft}
									handleGoingRight={this.handleGoingRight}
									InputComponent={field.InputComponent}
									placeholder={typeof fieldsWithError[field.id] === 'string'
										? fieldsWithError[field.id]
										: undefined
									}
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
