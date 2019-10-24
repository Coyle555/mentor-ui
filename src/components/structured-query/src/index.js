import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';

import { Typeahead } from './components/Typeahead';
import { keyEvent } from 'utils';
import { ActiveFilters } from './components/ActiveFilters';
import {
	_getHeader,
	_getInputDatatype,
	_getOptionsForTypeahead,
	_getParseForOptions,
	_isDuplicateToken,
	validateToken
} from './utils/utils';
import { ALL_OPERATIONS } from './constants';
import './styles/structured-filter.less';

export class StructuredQuery extends Component {

	static defaultProps = {
		customClasses: {},
		exportSearch: null,
		fields: [],
		initTokens: [],
	}

	static propTypes = {
		customClasses: PropTypes.object,
		fields: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string,
			options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
			parse: PropTypes.func,
			type: PropTypes.string
		})),
		exportSearch: PropTypes.func,
		initTokens: PropTypes.arrayOf(PropTypes.object),
		onTokenAdd: PropTypes.func,
		onTokenRemove: PropTypes.func,
	}

	constructor(props) {
		super(props);

		// @searchTokens - holds all user generated tokens to search with
		// 	Ex: [{label: 'id', operator: '=', value: '123'}, ...]
		// @nextToken - holds the next token to be added to the search 
		// 		tokens which are used for filtering -- 
		// 		contains:
		// 			@id - id for back end retrieval
		// 			@label - which field to search in
		//	 		@operator - the operator to apply to the field
		//	 		@value - the value to search for
		this.state = {
			searchTokens: this.props.initTokens.filter(validateToken),
			nextToken: {
				id: '',
				label: '',
				operator: '',
				type: '',
				value: ''
			}
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.initTokens !== prevProps.initTokens) {
			this.setState({ searchTokens: this.props.initTokens.filter(validateToken) });
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
		} else if (!!this.state.nextToken.label) {
			this.setState({
				nextToken: {
					id: '',
					label: '',
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
	// 1. The label is selected so add label name to the typeahead component
	// 2. The operator is selected so add an operator to the typeahead component
	// 3. The value has been added so add a token to the searchTokens, retrieve
	// 	the new data from the backend, and re-render
	//
	// @value: value to add to the token
	_addTokenForValue = (value) => {
		const { fields } = this.props;
		const { nextToken, searchTokens } = this.state;

		// Handle attaching a label to input
		if (nextToken.label === '') {
			this._addLabelToNewToken(value);
			return;
		}

		// Handle attaching an operator
		if (nextToken.operator === '') {
			this._addOperatorToNewToken(value);
			return;
		}

		const newToken = Object.assign({}, nextToken, { value });
		const parse = _getParseForOptions(fields, nextToken);

		// Else, we are attaching a value so we need to add the 
		// next token to the list of all tokens
		// We check first to make sure there are no duplicates
		if (!_isDuplicateToken(searchTokens, newToken, parse)) {
			this._addValueToNewToken(value);
		}
	}
	
	// Add a label to the new token
	_addLabelToNewToken(value) {
		let field = this.props.fields.find(field => {
			return field.label === value;
		});

		const newToken = Object.assign({},
				this.state.nextToken,
				{
					label: value,
					id: field.id,
					type: field.type
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
					label: '',
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
				label: '',
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
	_removeTokenForValue = (token) => {
		const { onTokenRemove } = this.props;
		const searchTokens = this.state.searchTokens.filter(searchToken => searchToken !== token);

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
		const { customClasses, exportSearch, fields } = this.props;
		const { nextToken, searchTokens } = this.state;

		const filterClasses = classNames({
			'filter-tokenizer': true,
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
					fields={fields}
					onRemove={this._removeTokenForValue}
					searchTokens={searchTokens}
				/>
				<Typeahead
					addTokenForValue={this._addTokenForValue}
					label={nextToken.label}
					customClasses={customClasses}
					datatype={_getInputDatatype(nextToken, fields)}
					header={_getHeader(nextToken)}
					onKeyDown={this._onKeyDown}
					operator={nextToken.operator}
					options={_getOptionsForTypeahead(fields, nextToken)}
					parse={_getParseForOptions(fields, nextToken)}
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
