# Structured Query

## Overview

Structured Query filters data by generating tokens that describe how to filter data.

Props | Type | Required | Description
----- | ---- | -------- | -----------
[fields](#fields) | [Object] | **Yes** | Fields used for filter
[customClasses](#customClasses) | Object | No | Custom classes that can be applied to components of the structured query
exportSearch | Function | No | Callback when exporting applied tokens
initTokens | [Object] | No | Tokens used to initialize structured query. See [tokens](#tokens)
onTokenAdd | Function | No | Callback used after a token is added. Callback receives [tokens](#tokens). Signature *([token]) => {}*
onTokenRemove | Function | No | Callback used after a token is removed. Callback receives [tokens](#tokens). Signature *([token]) => {}*

### Tokens

Tokens have the following keys:

- **id**(*string*): id of the token
- **label**(*string*): label of the token
- **operator**(*string*): operation applied to the token
- **type**(*string*): data type of the token value
- **value**(*string*): value input by the user

### Fields

Fields have the following shape:

- **id**(*string*) **REQUIRED**: The id of the field
- **label**(*string*): Label of the field to display to the user
- **options**(*[string]*): List of options on an enumerated list of values.
- **type**(*string*): Data type of the field. Defaults to text, but will render a datepicker when 
the type is date or datetime
