# Tables

## Overview

Tables are designed for large data sets retrieved through an api. The table uses events to make callbacks 
so you can retrieve new pages of data from an api as the user sorts, goes to the next page, jumps pages, etc.

Props | Type | Required | Description
----- | ---- | -------- | -----------
currentPage | Number | Yes | The current page displayed
data | [Object] | Yes | Data to display in the table
recordCount | Number | Yes | Total number of records in the data set of the table
allowSelection | Boolean | No | Allows rows to be selected when true
csvURL | String | No | Generate an icon that can be clicked to call a url for a data dump of the table
[columns](#columns) | [Object] | Yes | List of objects describing the columns structure
[customClasses](#customClasses) | Object | No | Custom classes to apply to different parts of the table
customColumns | [Object] | No | Render a column in view mode using a callback
customLayout | Function | No | Callback to render the two components of the table
customToolbarButtons | [Object] | No | Adds buttons to the toolbar of the table
deletable | Boolean | No | Renders a toolbar button to let rows be deleted when true
deleteCb | Function | No | Callback when the delete toolbar button is called
editable | Boolean | No | Renders a toolbar button to let rows be edited when true
ExpandComponent | Function | No | React component to render when a row gets expanded
exportTable | Function | No | Callback to export the current state of the table
formFields | [Object] | No | Form fields to use when the user inserts a record
getRowName | Function | No | Callback to use to get the row name for the edit modal
id | String | No | Id attached to the table DOM
initInsertData | Object | No | Initial insertion data to add to a record when being inserted
insertable | Boolean | No | Renders a toolbar button to insert records when true
insertCb | Function | No | Callback to use when the user finishes inserting data for a new record
loading | Boolean | No | Renders a loading icon on the table. Useful when the table relies on external data to render.
multipleInsertion | Boolean | No | Renders a toolbar button to allow the user to insert multiple records at a time.
pagination | Boolean | No | Renders the pagination on the table when true
quickViews | [Object] | No | List of preset column configurations the user can select
rowButtons | [Object] | No | List of buttons to render at the beginning of each row
singleInsertion | Boolean | No | Renders a toolbar button to allow the user to insert a single record at at a time.
sortDir | [ASC, DESC] | No | The direction of a sorted column
sortId | String | No | The id of a column being sorted
updateCb | Function | No | Update callback to call when the user edits a record
viewColumns | Boolean | No | Renders a toolbar button to allow users to turn on/off columns when true


## Columns

Column object takes the following keys:

- **display**(*boolean*): true to display the column on render
- **id**(*string*): id of the column
- **insertable**(*boolean*): true to allow the user to insert data against this column when inserting a new record
- **label**(*string*): header label of the column
- **options**(*[string] | function*): display a list of string options when editing or inserting against this column; a function can be used to return a list of options to use
- **required**(*boolean*): renders a required field when inserting or editing the column
- **type**(*enum*): the data type of the column; see below
- **updateable**(*boolean*): allows the user to edit the data in the column

#### Types allowed::

- string
- integer
- float
- multiline(render a textarea when editing/inserting)
- email
- money
- url
- datetime
- date
- image
- listfilter
- file
- color
- boolean
- select
- textarea

## CustomClasses

The following keys apply a css class to different parts of the table

- **container**: outermost element of the table
- **table**: table element
- **tableBody**: tbody in the table element
- **tableHeader**: thead in the table element
- **tableHeaderRow**: row rendered in the thead element
- **tableHeaderCell**: each cell rendered in the row of the thead element
- **tableRow**: each row rendered in the table body
- **tableCell**: each cell in the rows rendered in the table body
