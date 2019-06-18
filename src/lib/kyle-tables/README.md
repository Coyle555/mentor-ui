# Kyle Tables

## Table of Contents

|    | Section                       |
| -- | ----------------------------- |
| 1. | [Overview](#overview)         |
| 2. | [Dependencies](#dependencies) |
| 3. | [Features](#features)         |
| 4. | [Props](#props)               |
| 5. | [Plugins](#plugins)           |
| 6. | [Utilities](#utilities)       |

## Overview

Kyle tables is a library that will generate a table from data and has various 
customization options. 

## Dependencies

Kyle Tables relies on [structured-query](../structured-query) for filtering 
and [insert-popup-form](../insert-popup-form) for insertion.

## Features

Kyle Tables have two modes of viewing. The first is normal mode, which displays 
the data in a tabular format for the user to read. The second is edit mode, 
which renders text/dropdown inputs so the user can edit the data.

Kyle Tables has the following customizations available to it:

* **Collapsible:** Toggle if panel with table can be collapsed
* **Columns:** Description of the columns
* **Concatenate Columns:** Concatenate multiple column values into a single 
column
* **Custom Classes:** Customize various table components
* **Custom Columns:** Customize the way a column renders
* **Custom Edit Buttons:** Add button components to the end of the row when 
the user is in edit mode. By default, the row will render the delete button. 
Any custom edit buttons will be placed next to the delete button.
* **Custom Layout:** Change the order in which the layout renders
* **Custom Row Class:** Add conditional css to a row based off of row data.
* **Deletable:** Allow the user to delete rows from the table.
* **Disable Column Edit:** Disables indicated columns from being edited
* **Display Insert Row:** Allows an insert row to sit on top of the table body
* **Draggable:** Sets rows to be draggable in view mode
* **Editable:** Toggles if the user is allowed to edit the table data
* **Edit Draggable:** Sets rows to be draggable in edit mode
* **Enable Query On Click:** A toggle passed into the filter dependency to 
turn on filtering if its been disabled
* **Force Edit:** Forces the table into edit mode with no way for the user to 
turn it off.
* **Get Files:** Toggle the export files option in the header. Export files 
will generate a pdf/excel file of the table data for the user to save to their 
computer.
* **Initial Insert Data:** Used to initialize the insertion field of the table.
* **Insertable:** Toggle if the user is allowed to insert data into the table.
* **Linked:** Allows the users to click on rows and a link callback function 
will fire.
* **Link Function:** The link function callback to use when the user clicks a 
row.
* **Model:** Metadata to describe the table columns.
* **Multiple Insertion:** Allow the user to enter multiple records into the 
table.
* **Pagination:** Toggle if you want pagination to be displayed to the user.
* **Query Disabled:** Toggle that gets passed to disable the filter.
* **Quick Views:** List of views that can be clicked by the user to quickly 
switch what columns are being displayed.
* **Select Record Count:** Dropdown to allow the user to select how many 
records are displaying.
* **Single Insertion:** Allow the user to enter one record at a time.
* **Title:** Title of the table in the header.
* **View Columns:** Allow the user to choose which columns to display.

## Props

* **[collapsible ( *[bool]* )](#collapsible)**
* **[columns ( *[object]* )](#columns)**
* **[customClasses ( *object* )](#customclasses)**
* **[customColumns ( *object* )](#customcolumns)**
* **[customEditButtons ( *[func]* )](#customeditbuttons)**
* **[customLayout ( *func* )](#customlayout)**
* **[deletable ( *bool* )](#deletable)**
* **[disableColEdit ( *object* )](#disablecoledit)**
* **[displayInsertRow ( *object* )](#displayinsertrow)**
* **[draggable ( *object* )](#draggable)**
* **[editable ( *bool* )](#editable)**
* **[editDraggable ( *object* )](#editdraggable)**
* **[enableQueryOnClick ( *bool* )](#enablequeryonclick)**
* **[forceEdit ( *bool* )](#forceedit)**
* **[getFiles ( *bool* )](#getfiles)**
* **[initInsertData ( *object* )](#initinsertdata)**
* **[insertable ( *bool* )](#insertable)**
* **[linked ( *bool* )](#linked)**
* **[linkFunc ( *func* )](#linkfunc)**
* **[model ( *object* )](#model)**
* **[multipleInsertion ( *bool* )](#multipleinsertion)**
* **[pagination ( *bool* )](#pagination)**
* **[queryDisabled ( *bool* )](#querydisabled)**
* **[quickViews ( *[object]* )](#quickviews)**
* **[selectRecordCount ( *bool* )](#selectrecordcount)**
* **[singleInsertion ( *bool* )](#singleinsertion)**
* **[title ( *string* )](#title)**
* **[viewColumns ( *bool* )](#viewcolumns)**

### collapsible

True if panel holding the table can be collapsed; false otherwise

### columns

A list of objects describing how each column should render and behave. Each 
column object has the following:

* **id:** id of the column 
* **category:** name of the column 
* **display:** should column be rendered
* **linkedFields:** other columns that should change based on changes to this 
column
* **options:** list of options to render for a cell dropdown in edit mode
* **optionObjs:** list of option objects to render for a cell dropdown in edit 
mode
* **insertable:** render form fields in the insert popup form lib
* **required:** signify required form fields in insert popup form lib
* **type:** data type of a column
* **updateable:** edit mode will render an input box to change the cell value

#### column

Required name of the column to output the concatenation to.

#### withColumns

Required list of strings of columns to concatenate together.

#### delimiter

Optional delimiter to separate the column data. If no delimiter is used, it 
defaults to a space.

### customClasses

Custom css classes to apply to parts of the table including:

  * container
  * table
  * tableBody
  * tableHeader
  * tableHeaderRow
  * tableHeaderCell
  * tableRow
  * tableCell
  * tableEditCell

Ex:

```javascript
{
	container: '123',
	tableRow: '456',
	tableEditCell: 'foo'
}
```

### customColumns

Object to describe how column(s) should render. Each field in the object 
should be a column id with a callback function as a value. This function will 
take two arguments. The first one is the value that would be outputted to the 
column by default. The second one being all the rows data. The return type 
should be a react element.

For example, if we have a column with an id of name, a row id of 123, and a 
value of Test:

Then, passing in for the customColumns props:

```javascript
{
	name: (value, row) => {
		return <div>{row.id}: {value}</div>;
	}
}
```

will output

```
<div>123: Test</div>
```

in your column cell output for every row

### customEditButtons

Pass in a list of function callbacks to use to add custom buttons to the row 
when the user is in edit mode. The default button at the end of the row is a 
delete button. Any custom edit buttons will be placed beside, to the left, of 
the delete button in the order of the list.

Each function passed in the list will be used as a callback. These functions 
will be passed three parameters. The first parameter is the row data describing 
the row. The second and third parameters are event handlers dealing with mouse 
entering and leaving the button. Usually you will just set your button to 
use the default event handlers on mouse enter and mouse leave. The return type 
should be a react element.

Example:

```javascript
function customEdit(row, mouseEnter, mouseLeave) {
	return (
		<button
			onMouseEnter={mouseEnter}
			onMouseLeave={mouseLeave}
		>
			{row.id}
		</button>
	);
}
```

will be passed into the table prop as:

```javascript
customEditButtons={[customEdit]}
```

### customLayout

Customize the output of the kyle-tables by changing the layout. This also 
allows you to enter custom components between table components. A function 
callback is used to render the custom layout. The custom layout callback 
takes two parameters. The first one is the structured filter component and the 
second one is the table component. The return type should be a react element.

For example, to flip the render order of the filter and table:

```javascript
function customLayout(filterComponent, tableComponent) {
	return (
		<div>
			{tableComponent}
			{filterComponent}
		</div>
	);
}
```

### deletable

True if user can delete rows in edit mode; false otherwise

### disableColEdit

An object describing which columns should be uneditable when user is in edit 
mode. The fields should be the column id with a truthy value to set them 
uneditable.

Example:

```javascript
{
	name: true,
	desc: true
}
```

This will cause the name and desc columns to no longer render any inputs in 
edit mode.

### displayInsertRow

Instead of using the form to insert records into the table, you can place an 
insertion row at the top of the table. To tell the table which fields to allow 
the user to input for insertion, you pass in an object describing the insertion.

Example:

Say you have a table with insertable columns username, role, and category. If 
you only want the user to insert a record into the table from the row with 
username and role you can pass in the following object into the 
displayInsertRow prop:

```javascript
{
	username: true,
	role: true
}
```

This will render the proper input boxes for username and role while ignoring 
the category field.

### draggable

Draggable is used for dragging when the user is in the normal view mode. 
Draggable takes an object with fields dragType and dragCb. The drag type is an 
id for the drag function. The drag callback is fired when the user finishes a 
drag event. 

The drag callback function receives two arguments when the user finishes 
dragging. The first argument is the dragged row id, which is the id of the row 
the user dragged. The second argument is the component id that the user 
dropped the row on. An event can then be fired with these ids after the user 
drops the row.

Example:

```javascript
{
	dragType: DRAG_TYPES.FOO,
	dragCb: (draggedRowId, droppedOnId) => {
		handleEvent(draggedRowId, droppedOnId);
	}
}
```

### editable

True if the user is allowed to edit table data; false otherwise

### editDraggable

Edit draggable is used for dragging when the user is in edit view mode.

Otherwise, it's the same as **[draggable ( *object* )](#draggable)**.

### enableQueryOnClick

Used for structured query dependency. True if you have disabled querying and 
want to allow the user to enable it by clicking on structured query; false 
otherwise. See also [queryDisabled](#queryDisabled).

### forceEdit

True to force the table into edit mode; false otherwise.

### getFiles

True if the user is allowed to download various file formats of the table 
data; false otherwise.

### initInsertData

Used for insert-popup-form dependency. Allows the passing in of initialization 
data into the insert form. See 
[initInsertData](../insert-popup-form#initinsertdata)

### insertable

True if the user is allowed to insert records into the table; false otherwise

### linked

True if the table rows have click event handlers; false otherwise

### linkFunc

A function callback that is fired when the user clicks a row. The function has 
two arguments. The first argument is the id of the row clicked. The second 
argument is the row data object.

Example:

```javascript
function linkFunc(rowId, row) {
	handleClick(rowId, row);
}
```

### model

Model describes the metadata of the table. The metadata tells the table the 
following:

* columns of the table
* describes the cells in edit mode
* describes how to insert a new record
* links cells together in the same row
* data type of a column
* if a column is updatable
* if the column is displayed by default

Usually, model will not be passed in directly, but the converted model, which 
transforms models into an array of objects where each object describes a 
column.

### multipleInsertion

True if the user can enter multiple records with the same input form; false 
otherwise.

### pagination

True if the user can move between pages at the bottom of the table; false 
otherwise.

### queryDisabled

Used for the structured query library. True if querying the table is disabled; 
false otherwise. See also [enableQueryOnClick](#enablequeryonclick).

### quickViews

Will generate buttons in the header that allows the user to quickly switch 
between a preset group of columns to view. Takes a list of objects describing 
each view. Each object has an icon field describing the button to render in the 
header and an object with the columns to render in the table when clicked. The columns to 
render can also have a custom field attached to their object to change the way 
the column is rendered. This custom field is a function callback that takes 
the value of the cell and the row data as arguments.

The icon should be in the form: 

```javascript
<i className="fa fa-example" data-tip"Enter tooltip info here" />
```

Example:

```javascript
[{
	icon: <i className="icon" />,
	columns: {
		name: {},
		desc: {
			custom: (value, row) => {
				return <div>{value}</div>;
			}
		}
	}
}]
```

### selectRecordCount

True if the user is allowed to change the number of records being viewed; 
false otherwise.

### singleInsertion

True if the user is allowed to insert a single record at a time; false 
otherwise.

### title

Title of the table. Rendered in table header.

### viewColumns

True if the user can toggle currently viewable columns; false otherwise.

## Plugins

Kyle tables come with some prebuilt plugins. These plugins will take your 
initial configuration of the table and add extra functionality to it.
Each plugin prop is passed into the table as an object with the fields:

```javascript
{
	type: oneOf['expand', 'hierarchy']
	options: [Plugin options]
}
```

Currently, only one plugin can be used at a time.

The plugins available are:

* **[Expand](#expand)**
* **[Hierarchy](#hierarchy)**

### Expand

The expand plugin allows you to insert a custom component in between rows. 
This component will render when the row expansion arrow is clicked. This 
component will always render below the expanded row.

The options object has a field with the component to render on row expansion. 
This expanded component will have the following props passed in:

* **row:** The object containing the data of the row expanded
* **updateCb:** The update callback to use if the user updates any data in the 
expanded component
* **editable:** If the user has permission to edit the expanded component. Is 
inherited from the table editable prop

The expanded component can be used to render and make changes to the row data 
by using the editable and updateCb props.

### Hierarchy

The hierarchy plugin takes a list of data that resembles a tree data structure 
and uses that to construct a table with branches. The plugin converts each row 
in the table into a branch of a tree. 

Hierarchy plugin changes the table in the following way:

* When a branch is clicked, the child nodes are expanded in the table, if they 
exist.
* Rows can be dragged in edit mode and moved as a child into another branch.
* In edit mode, a child can be added to each branch and will be inserted 
immediately under the branch.

The options field takes an object with a column field to tell the plugin which 
column to use to render the branches.

## Utilities

The utility function convertModel can be imported from kyle tables using:

```javascript
import { convertModel } from 'kyle-tables';
```

If you need to convert a model object to the columns(such as being used 
with the insert-popup-form library), you can use the convertModel function.
