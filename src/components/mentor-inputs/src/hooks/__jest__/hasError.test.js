import { hasError } from '../hasError';

test('Error when no value and required', () => {
  expect(hasError('', true)).toBe('Value is required');
});

test('No error when value and required', () => {
  expect(hasError('foo', true)).toBe(false);
});

test('No error when no value and not required', () => {
  expect(hasError('', false)).toBe(false);
});

test('Error with custom validator', () => {
  const validator = jest.fn(val => false);

  expect(hasError('foo', false, validator)).toBe('An error occurred');
  expect(validator).toHaveBeenCalledWith('foo');
});

test('No error with custom validator', () => {
  const validator = jest.fn(val => true);

  expect(hasError('foo', false, validator)).toBe(false);
});
