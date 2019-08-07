import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';

import { Typeahead } from '../typeahead/typeahead';
import { keyEvent } from 'utils';
import { ActiveFilters } from './activeFilters';
import {
	_getCategoryDataType,
	_getCategoryOptions,
	_getHeader,
	_getInputDatatype,
	_getOptionsForTypeahead,
	_isDuplicateToken,
	validateToken
} from './utils/utils';
import { ALL_OPERATIONS } from './constants';
import './styles/structured-filter.less';

// A typeahead that, when an option is selected replaces the text entry
// widget with a renderable 'token' that can be deleted by pressing
// backspace on the beginning of the line
export class Tokenizer extends Component {

	static defaultProps = {
		// options is an array of objects with fields of
		// id, category, type
		options: [],
		customClasses: {},
		initTokens: [],
		disabled: false,
		exportSearch: null
	}

	static propTypes = {
		disabled: PropTypes.bool,
		exportSearch: PropTypes.func,
		options: PropTypes.arrayOf(PropTypes.shape({
			category: PropTypes.string,
			id: PropTypes.string.isRequired,
			type: PropTypes.string
		})),
		customClasses: PropTypes.object,
		onTokenAdd: PropTypes.func,
		onTokenRemove: PropTypes.func,
		initTokens: PropTypes.arrayOf(PropTypes.object)
	}

	constructor(props) {
		super(props);

		// @searchTokens - holds all user generated tokens to search with
		// 	Ex: [{category: 'id', operator: '=', value: '123'}, ...]
		// @nextToken - holds the next token to be added to the search 
		// 		tokens which are used for filtering -- 
		// 		contains:
		// 			@id - id for back end retrieval
		// 			@category - which field to search in
		//	 		@operator - the operator to apply to the field
		//	 		@value - the value to search for
		this.state = {
			searchTokens: this.props.initTokens.filter(validateToken),
			nextToken: {
				id: '',
				category: '',
				operator: '',
				type: '',
				value: ''
			}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.initTokens !== nextProps.initTokens) {
			this.setState({ searchTokens: nextProps.initTokens.filter(validateToken) });
		}
	}

	// Handle removing a token from the input box when user hits backspace
	_onKeyDown = (event, value) => {
		// only care about backspaces for removing token parts
		if (event.keyCode !== keyEvent.DOM_VK_BACK_SPACE || value) {
			return;
		}

		event.preventDefault();

		// remove part of a new token
		if (!!this.state.nextToken.operator) {
			this.setState({
				nextToken: Object.assign(
					{},
					this.state.nextToken,
					{ operator: '', value: '' }
				)
			});
		} else if (!!this.state.nextToken.category) {
			this.setState({
				nextToken: {
					id: '',
					category: '',
					operator: '',
					type: '',
					value: ''
				}
			});
		}
	}

	// Add a token to the users current query
	// One of three things can happen when a user selects something
	// 
	// 1. The category is selected so add category name to the typeahead component
	// 2. The operator is selected so add an operator to the typeahead component
	// 3. The value has been added so add a token to the searchTokens, retrieve
	// 	the new data from the backend, and re-render
	//
	// @value: value to add to the token
	_addTokenForValue = (value) => {
		const { nextToken, searchTokens } = this.state;

		// Handle attaching a category to input
		if (this.state.nextToken.category === '') {
			this._addCategoryToNewToken(value);
			return;
		}

		// Handle attaching an operator
		if (this.state.nextToken.operator === '') {
			this._addOperatorToNewToken(value);
			return;
		}

		// Else, we are attaching a value so we need to add the 
		// next token to the list of all tokens
		// We check first to make sure there are no duplicates
		if (!_isDuplicateToken(searchTokens, Object.assign({}, nextToken, { value }))) {
			this._addValueToNewToken(value);
		}
	}
	
	// Add a category to the new token
	_addCategoryToNewToken(value) {
		let option = this.props.options.find(option => {
			return option.category === value;
		});

		const newToken = Object.assign({},
				this.state.nextToken,
				{
					category: value,
					id: option.id,
					type: option.type
				});

		this.setState({ nextToken: newToken });
	}

	// Add an operator to the new token
	_addOperatorToNewToken(value) {
		const { nextToken } = this.state;

		// if the operation is to search for empty/non-empty values,
		// then skip adding a value to a new token
		if (value === ALL_OPERATIONS.IS_EMPTY || value === ALL_OPERATIONS.IS_NOT_EMPTY) {
			const { onTokenAdd } = this.props;
			const addSearchToken = Object.assign(
				{},
				this.state.nextToken,
				{ operator: value }
			);

			this.setState({
				nextToken: {
					id: '',
					category: '',
					operator: '',
					type: '',
					value: ''
				},
				searchTokens: this.state.searchTokens.concat(addSearchToken)
			}, () => {
				if (typeof onTokenAdd === 'function') {
					// clone tokens so they cant be mutated
					onTokenAdd(this.state.searchTokens.map(tkn => ({ ...tkn })));
				}
			});
		} else {
			const newToken = Object.assign({}, nextToken, { operator: value });

			this.setState({ nextToken: newToken });
		}
	}

	// Add a new value to the new token and add to
	// all search tokens
	_addValueToNewToken(value) {
		const { onTokenAdd } = this.props;
		const addSearchToken = Object.assign(
			{},
			this.state.nextToken,
			{ value }
		);

		this.setState({
			nextToken: {
				id: '',
				category: '',
				operator: '',
				type: '',
				value: ''
			},
			searchTokens: this.state.searchTokens.concat(addSearchToken)
		}, () => {
			if (typeof onTokenAdd === 'function') {
				onTokenAdd(this.state.searchTokens.map(tkn => Object.assign({}, tkn)));
			}
		});
	}

	// Remove a token from the search tokens
	_removeTokenForValue = (value) => {
		const { onTokenRemove } = this.props;
		// dont allow removal of tokens if querying is disabled
		if (this.props.disabled) {
			return;
		}

		const index = this.state.searchTokens.indexOf(value);

		// return nothing if object not found
		if (index === -1) return;

		const searchTokens = this.state.searchTokens.filter((token, i) => {
			return index !== i;
		});

		this.setState({
			searchTokens
		}, () => {
			if (typeof onTokenRemove === 'function') {
				onTokenRemove(this.state.searchTokens.map(tkn => Object.assign({}, tkn)));
			}
		});
	}

	exportSearch = () => {
		if (typeof this.props.exportSearch === 'function') {
			this.props.exportSearch(this.state.searchTokens);
		}
	}

	clearSearch = () => {
		const { onTokenRemove } = this.props;

		this.setState({ searchTokens: [] }, () => {
			if (typeof onTokenRemove === 'function') {
				onTokenRemove(
					this.state.searchTokens.map(tkn => Object.assign({}, tkn))
				);
			}
		});
	}

	render() {
		const { customClasses, disabled, exportSearch, options } = this.props;
		const { nextToken, searchTokens } = this.state;

		const filterClasses = classNames({
			'filter-tokenizer': true,
			'filter-disabled': disabled,
			[customClasses.container]: !!customClasses.container
		});

		const exportSearchClasses = classNames(
			'left-addon first-addon export-search',
			{ 'export-search-enabled': typeof exportSearch === 'function' }
		);

		return (
			<div className={filterClasses}>
				<span
					className={exportSearchClasses}
					data-for="structured-query-tooltip"
					data-tip="Save Search"
					onClick={this.exportSearch}
				>
					<i className="fal fa-save" />
				</span>
				<ActiveFilters 
					clearSearch={this.clearSearch}
					disabled={disabled}
					onRemove={this._removeTokenForValue}
					searchTokens={searchTokens}
				/>
				<Typeahead
					addTokenForValue={this._addTokenForValue}
					category={nextToken.category}
					customClasses={customClasses}
					datatype={_getInputDatatype(nextToken, options)}
					disabled={disabled}
					header={_getHeader(nextToken)}
					onKeyDown={this._onKeyDown}
					operator={nextToken.operator}
					options={_getOptionsForTypeahead(options, nextToken)}
				/>
				{/*<span className="input-group-addon right-addon">
					<i className="far fa-search" />
				</span>*/}
				<ReactTooltip
					id="structured-query-tooltip"
					place="top"
					type="dark"
					effect="solid"
					multiline={false}
				/>
			</div>
		);
	}
}
