import React from 'react';
import renderer from 'react-test-renderer';
import BooleanInput from '../../components/boolean-input/booleanInput';
import DatePickerInput from '../../components/datepicker-input/DatePickerInput';
import EmailInput from '../../components/email-input/emailInput';
import FileInput from '../../components/file-input/fileInput';
import FloatInput from '../../components/float-input/floatInput';
import IntegerInput from '../../components/integer-input/integerInput';
import ListFilter from '../../components/list-filter/index';
import MoneyInput from '../../components/money-input/moneyInput';
import SelectInput from '../../components/select-input/selectInput';
import TextInput from '../../components/text-input/textInput';
import TextareaInput from '../../components/textarea-input/textareaInput';
import URLInput from '../../components/url-input/urlInput';
import { getMentorInput } from '../utils';

describe('getMentorInput factory function cases', () => {
	test('default text input case', () => {
		const SourceComp = getMentorInput('');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<TextInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('list filter Input case', () => {
		const SourceComp = getMentorInput('listfilter');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<ListFilter />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('boolean Input case', () => {
		const SourceComp = getMentorInput('boolean');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<BooleanInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('Integer Input case', () => {
		const SourceComp = getMentorInput('integer');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<IntegerInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('File Input case', () => {
		const SourceComp = getMentorInput('file');
		const testTree = renderer.create(<SourceComp onDrop={() => null} />).toJSON();
		const target = renderer.create(<FileInput onDrop={() => null} />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('Float Input case', () => {
		const SourceComp = getMentorInput('float');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<FloatInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('Date Input case', () => {
		const SourceComp = getMentorInput('date');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<DatePickerInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('Datetime Input case', () => {
		const SourceComp = getMentorInput('datetime');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<DatePickerInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('Email Input case', () => {
		const SourceComp = getMentorInput('email');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<EmailInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('Select Input case', () => {
		const SourceComp = getMentorInput('select');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<SelectInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('textarea Input case', () => {
		const SourceComp = getMentorInput('textarea');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<TextareaInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('Multiline Input case', () => {
		const SourceComp = getMentorInput('multiline');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<TextareaInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('Money Input case', () => {
		const SourceComp = getMentorInput('money');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<MoneyInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('URL Input case', () => {
		const SourceComp = getMentorInput('url');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<URLInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('String Input case', () => {
		const SourceComp = getMentorInput('string');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<TextInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
	test('text Input case', () => {
		const SourceComp = getMentorInput('text');
		const testTree = renderer.create(<SourceComp />).toJSON();
		const target = renderer.create(<TextInput />).toJSON();
		expect(JSON.stringify(testTree)).toEqual(JSON.stringify(target));
	})
})