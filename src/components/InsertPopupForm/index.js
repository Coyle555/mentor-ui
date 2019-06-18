import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
	Field,
	Label,
	Portal,
	Stepper,
	SelectedOption,
} from './components';

import {
	asyncFilter,
	getMentorInput,
	AsyncDropdown,
	ListFilter,
	//TableInput,
	TextareaInput,
	SelectInput
} from 'mentor-inputs';

import { KeyEvent } from 'utils/keyEvent';

import './styles/form.less';

const TABLE_INPUT_RE = /^\/(\w+)/;

// Insert form pops up a transparent background with a form that asks one
// question at a time based on the formFields inputted. Once an input is
// filled out, it jumps to the next input. It allows for navigation using the
// Enter, Tab, and arrow up and down keys.
export default class InsertForm extends Component {

	static propTypes = {
		formFields: PropTypes.arrayOf(PropTypes.shape({
			asyncFilter: PropTypes.string,
			category: PropTypes.string,
			collection: PropTypes.bool,
			id: PropTypes.string.isRequired,
			options: PropTypes.arrayOf(PropTypes.string),
			required: PropTypes.bool,
			tokenize: PropTypes.bool,
			type: PropTypes.string
		})).isRequired,
		initInsertData: PropTypes.object,
		onDisable: PropTypes.func,
		onSubmit: PropTypes.func
	}

	static defaultProps = {
		formFields: [],
		initInsertData: {},
		onDisable: null,
		onSubmit: null,
		resetForm: false
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
			event.preventDefault();
			event.stopPropagation();

			if (event.shiftKey) {
				this.handleGoingLeft();
			} else {
				this.handleGoingRight();
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

		// grab only insertable fields for the form
		let formModel = formFields.filter(field => field.insertable !== false);

		let InputComponent = null;
		let MentorInput = null;
		let mentorInputProps = {};

		// initialize insert data
		formModel.forEach((field, i) => {
			mentorInputProps = {
				autoFocus: true,
				className: 'form-input',
				key: field.id,
				name: field.id,
				onBlur: this._handleInputBlur,
				onChange: this._handleInputChange,
				onKeyDown: this.onKeyDown,
				required: field.required,
				value: '',
				validation: this.validateField
			};
			
			if (!!field.options) {

				InputComponent = (
					<SelectInput
						{...mentorInputProps}
						options={field.options}
					/>
				);
			} else if (field.lookup) {

				InputComponent = (
					<AsyncDropdown
						{...mentorInputProps}
						{...field.lookup}
					/>
				);

			} else if ((!!field.asyncFilter || field.type === 'listfilter') && !field.tableOnInsert) {
				delete mentorInputProps.onBlur;

				InputComponent = (
					<ListFilter
						{...mentorInputProps}
						customFilter={asyncFilter(field.asyncFilter)}
						onMatch={this._handleOptionMatch}
					/>
				);
			} else if (field.multiline) {

				InputComponent = <TextareaInput {...mentorInputProps} />;

			} else if (!!field.tableOnInsert) {

				InputComponent = (
					<input 
						disabled
						value="Under Construction"
					/>
				)
				// InputComponent = (
				// 	<TableInput
				// 		{...mentorInputProps}
				// 		apiInfo={field.tableOnInsert}
				// 		onSelectData={this._handleOptionMatch}
				// 	/>
				// );

			} else {
				MentorInput = getMentorInput(field.type);

				InputComponent = (
					<MentorInput
						{...mentorInputProps}
						onKeyUp={field.tokenize
							? this._handleTokenizeKeyUp
							: undefined
						}
					/>
				);
			}

			this.insertData[field.id] = '';	// initialize insert data

			if (field.required) {
				newFieldsWithError[field.id] = true;
			}

			// initialize token fields
			if (field.collection || field.tokenize) {
				this.insertData[field.id] = {
					options: [],
					value: ''
				};

				// handle any initial data passed in for collections/tokens
				if (initInsertData[field.id]) {
					this.insertData[field.id].value = initInsertData[field.id];
					delete initInsertData[field.id];
				}
			}

			newSteps.push({
				id: field.id,
				title: field.category,
				error: !!field.required
			});

			newFormModel.push(Object.assign({}, field, { InputComponent }));
		});

		// initial data passed in to load into the form
		this.insertData = Object.assign({}, this.insertData, initInsertData);

		this.setState({
			currentInputLabel: formModel[0]
				? formModel[0].category
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

	// tokenized fields have a list of tokens rendered above the input field
	isFieldTokenized = () => {
		return this.getField().collection || this.getField().tokenize;
	}

	// handle input after user changes an input form, add new
	// value to current insert data object
	// @error(bool) - true if the field has an error via validation; false 
	// 	otherwise
	// @newValue(string) - new value in the input box
	// @fieldId(string) - id of the form field that was updated
	_handleInputChange = (error, newValue, fieldId) => {
		let fieldError = false;
		console.log({ error, newValue, fieldId });
		this.insertData[fieldId] = this.insertData[fieldId] || { options: [] };
		
		if (this.isFieldTokenized()) {
			console.log('tokenized');
			this.insertData[fieldId].value = newValue;

			// need to handle tokenized field error handling
			// differently than the other inputs
			if (this.insertData[fieldId].options.length === 0
				&& this.getField().required) {

				fieldError = true;
			}
		} else {
			this.insertData[fieldId] = newValue;
			fieldError = error;
		}

		this.handleFieldError(fieldError, fieldId);
	}

	// handle input after user blurs an input form, add new
	// value to current insert data object
	// @error(bool) - true if the field has an error via validation; false 
	// 	otherwise
	// @newValue(string) - new value in the input box
	// @fieldId(string) - id of the form field that was updated
	_handleInputBlur = (error, newValue, fieldId) => {
		let fieldError = false;

		if (this.isFieldTokenized()) {

			this.insertData[fieldId] = this.insertData[fieldId] || {};
			this.insertData[fieldId].value = newValue;

			// need to handle tokenized field error handling
			// differently than the other inputs
			if (this.insertData[fieldId].options.length === 0 && this.getField().required) {

				fieldError = true;
			}
		} else {
			this.insertData[fieldId] = newValue;
			fieldError = error;
		}

		this.handleFieldError(fieldError, fieldId);
	}

	// adding a new token to a tokenized form field
	_handleTokenizeKeyUp = (event) => {
		if (event.keyCode === KeyEvent.DOM_VK_ENTER ||
			event.keyCode === KeyEvent.DOM_VK_RETURN) {

			const fieldId = this.getField().id;
			const value = event.target.value;
			const index = this.insertData[fieldId].options.findIndex(option => {
				return option === value
			});

			// no value in input field or value exists in the options
			if (!value || index > -1) return;

			this.insertData[fieldId].options.push(value);
			this.insertData[fieldId].value = '';

			this.handleFieldError(false, fieldId);
		}
	}

	// handle matches in list filter for options
	// @option(string|object) - option that was matched
	// @fieldId(string) - field to assign the match to
	_handleOptionMatch = (option, fieldId) => {
		// add to list of values if it is a collection field
		if (this.getField().collection) {
			const currentInsertData = this.insertData[fieldId].options;

			const index = currentInsertData.findIndex(element => {
				if (typeof element === 'object') {
					return element.id === option.id
				} else {
					return element === option
				}
			});

			// do nothing if value is already in list
			if (index !== -1) return;

			this.insertData[fieldId].options.push(option);
			this.insertData[fieldId].value = '';
		// otherwise, it's just a singular value for that field
		} else {
			this.insertData[fieldId] = option; 
		}

		this.handleFieldError(false, fieldId);
	}

	handleFieldError = (error, fieldId) => {
		const { fieldIndex, fieldsWithError, steps } = this.state;
		const newFieldsWithError = Object.assign({}, fieldsWithError);
		const newSteps = steps.slice();

		if (error) {
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
		});
	}

	removeSelectedOption = (selectedOption) => {
		const fieldId = this.getField().id;
		const options = this.insertData[fieldId].options;
		let newOptions;

		if (typeof selectedOption === 'object') {
			newOptions = options.filter(option => option.id !== selectedOption.id);
		} else {
			newOptions = options.filter(option => option !== selectedOption);
		}

		const error = this.getField().required && newOptions.length === 0;

		this.insertData[fieldId].options = newOptions;
		this.handleFieldError(error, fieldId);
	}

	// handle submitting insertion data to the backend
	_onSubmit = () => {
		if (Object.keys(this.state.fieldsWithError).length > 0) {
			return;
		}

		if (typeof this.props.onSubmit === 'function') {
			const data = Object.keys(this.insertData).reduce((acc, val) => {
				if (typeof this.insertData[val] === 'object'
					&& this.insertData[val].options) {

					acc[val] = this.insertData[val].options;
				} else {
					acc[val] = this.insertData[val];
				}

				return acc;
			}, {});

			this.props.onSubmit(data);
		}

		if (this.props.resetForm) {
			this.resetForm();
		}
	}

	// resets a form to original state
	resetForm() {
		const { formModel } = this.state;
		const newIndex = 0;
		const initInsertData = Object.assign({}, this.props.initInsertData);
		this.insertData = {};

		// handle any initial data passed in for collections/tokens
		formModel.forEach(field => {
			if ((field.collection || field.tokenize) && initInsertData[field.id]) {
				this.insertData[field.id] = {
					options: [],
					value: initInsertData[field.id]
				};

				delete initInsertData[field.id];
			}
		});

		// initial data passed in to load into the form
		this.insertData = Object.assign({}, this.insertData, initInsertData);

		this.setState({
			fieldIndex: newIndex,
			currentInputLabel: this.state.formModel[newIndex].category
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
				currentInputLabel: formModel[newIndex].category
			});
		}
	}

	// handles going left the fields to be inserted
	handleGoingLeft = () => {
		const { formModel, fieldIndex } = this.state;

		let newIndex = fieldIndex - 1;

		if (newIndex < 0) return;

		this.setState({
			currentInputLabel: formModel[newIndex].category,
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
			currentInputLabel: formModel[index].category,
			fieldIndex: index
		});
	}

	// show selected options to user if the value is an array of options
	renderSelectedOptions = () => {
		// ignore if not a list of collected values
		if (!this.isFieldTokenized()) return;

		const fieldId = this.getField().id;
		const options = this.insertData[fieldId].options || [];

		return options.map((option, i) => (
			<SelectedOption
				key={i}
				onClick={this.removeSelectedOption}
				option={option}
			/>
		));
	}

	validateField = (value, name) => {
		const fieldId = this.getField().id;

		return this.isFieldTokenized()
			&& this.insertData[fieldId].options.length === 0
			&& this.getField().required;
	}

	render() {
		if (this.state.formModel.length === 0) {
			return null;
		}

		const { currentInputLabel, fieldIndex, fieldsWithError, steps } = this.state;

		const canGoLeft = (fieldIndex > 0);
		const canGoRight = ((fieldIndex + 1) < this.state.formModel.length);
		const fieldId = this.getField().id;

		let fieldValue = this.insertData[fieldId];
		
		if (this.isFieldTokenized()) {
			fieldValue = this.insertData[fieldId].value;
		}

		return (
			<Portal>
				<div className="insert-popup-overlay">
					<div className="insert-popup-container">
						<div className="close-form">
							<i
								className="fa fa-2x fa-times apm-cursor-p apm-color-red"
								data-testid="disable-form"
								onClick={this.onDisable}
							/>
						</div>
						<div className="selected-options">
							{this.renderSelectedOptions()}
						</div>
						<div className="layout">
							<div className="form">
								<Label
									label={currentInputLabel}
									required={this.getField().required}
								/>
								<Field
									canGoLeft={canGoLeft}
									canGoRight={canGoRight}
									canSubmit={!canGoRight
										&& Object.keys(fieldsWithError).length === 0}
									handleGoingLeft={this.handleGoingLeft}
									handleGoingRight={this.handleGoingRight}
									InputComponent={this.getField().InputComponent}
									value={fieldValue}
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
