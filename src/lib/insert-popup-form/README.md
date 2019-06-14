# Insert Popup Form

## Overview

Insert popup form creates a form that will take one input at a time until
all fillable inputs in the form are filled out. Is primarily used 
with [kyle tables](../) but can be used with other components as long as the
data passed in is valid.

### Features

Insert popup form presents a form one input box at a time until the user 
reaches the end of the form. When the user reaches the end, a Submit button 
is displayed and a callback is triggered with the data the user inserted being 
passed in. 

Insert popup form takes up the entire viewport of the browser and, as such, 
turning it on and off will usually be left to the parent component.

Insert popup form takes elements in an array and generates an input box for 
each element. It also takes enumerable lists and generates dropdown menus.

Initial insertion data can also be added to prefill fields in the form.

### Styling

CSS styles can be found in [insert-popup-form.css](../../../../../dependencies/styles/insert-popup-form.css)

## Props

* **[enabled ( *boolean* )](#enabled)**
* **[insertType ( *oneOf(['single', 'multiple'])* )](#inserttype)**
* **[formFields ( *[Object]* )](#formFields)**
* **[onDisable ( *Function* )](#ondisable)**
* **[onSubmit ( *Function* )](#onsubmit)**
* **[initInsertData ( *Object* )](#initinsertdata)**


### enabled

Toggle if the insert popup form is turned on/off. Since the popup form takes 
up the entire screen, when using it you may want to handle turning it off and 
on depending on user events. The enabled prop will allow you to do this.

### insertType

Insert popup form has two different forms of insertion. The string passed in 
must either be ```"single"``` or ```"multiple"```.

* **single**: Single insertion does not clear the form on submission nor does 
it reset to the first input field.
* **multiple**: Used for submitting multiple forms.
When the user submits a form, the form will clear and go back to 
the first input field ready to take more user input.

### formFields

An array of objects, where each object describes how to generate each input in 
the form. Each object is processed with the following fields:

```javascript
{
	id( **string** ): a unique identifier for each input box in the form
	insertable( **boolean** ): Used to determine if an input field will be 
		generated for this value. Generally only useful when retrieving 
		the form description from a database.
	required( **boolean** ): If true, a red warning will display to the user 
		that this field is required. There is no validation in the form  
		currently.
	category( **string** ): A title to display to the user with the input box
	options( **[string]** ): A list of strings to use for a dropdown menu. If 
		the field is required, the dropdown will default to the first 
		element in the list or null if not required.
}
```

### initInsertData

An object that corresponds each input field with the initial insertion data. 
For example, if an input field has an id of 'testId' and an initial value of 
'foo', you will pass in ```{ 'testId': 'foo' }```. This will set an input box 
with the initial value or set a dropdown menu to that value if the form field 
'testId' exists. It can also be used to add fields with insertion data that are 
not displayed to the user but are used for insertion.

### onDisable

Insert popup form can be toggled using the **[enabled](#enabled)** prop. But, 
the form also has internal state that allows the user to close out of it by 
hitting the close button or the escape key. To allow cleanup you can pass 
in a **onDisable** function prop to help cleanup when the user closes the form. 
This function will be called when the user exits the form if you need to manage 
some actions outside of the form.

### onSubmit

When the form is submitted by the user, **onSubmit** is called. The callback 
function will receive one argument, which is the data the user has submitted 
into the form. The data is an object with each field being the name of the 
input box and the value being what the user inputted. The fields correspond 
to the **formFields** prop passed in.
