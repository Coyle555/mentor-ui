# Insert Popup Form

## Overview

Insert popup form creates a form that will take one input at a time. Uses mentor inputs 
to render the inputs.


Props | Type | Required | Description
----- | ---- | -------- | -----------
[formFields](#formFields) | [Object] | **Yes** | Metadata on displaying the form
onSubmit | Function | **Yes** | Callback when the user submits the form. Signature *(data) => {}*
initInsertData | Object | No | Initial insertion data to add to the insert data
onDisable | Function | No | Callback when the user disables the form. Signature *() => {}*
resetForm | Boolean | No | Clears all inserted data and resets the form to the first field when true

### FormFields

Each form field object has the following shape:

- **id**(*string*) **REQUIRED**: id of the input field
- **label**(*string*) **REQUIRED**: label to render for the input field
- **linkTo**(*string*): Id of another field to link to. Linking fields means the linked to field must be 
filled out before this field can be filled out.
- **options**(*[] | function*): Either a list of options or a function callback to use that 
will generate a list of options. Can be used in conjunction with parse and parseMatchedValue to 
use any data form as it is a list. Function signature *(value) => []*
- **parse**(*function*): Callback to parse an option before displaying it to the user on options lists
- **parseMatchedValue**(*function*): Callback to parse a selected option before sending it back 
with the insert data object
- **required**(*boolean*): Field is required for submission when true
- **type**(*string*): The data type of the input. Defaults to string.
