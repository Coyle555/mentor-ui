# TableMain

## Overview

The data table without the header

Props | Type | Required | Description
----- | ---- | -------- | -----------
[columns](#columns) | [Object] | Yes | List of objects describing the columns structure
customClasses | Object | No | Custom classes to apply to different parts of the table
[events](#events) | Object | No | Handle events triggered by user actions
id | String | No | Id attached to the table DOM
[pageProperties](#pageProperties) | Object | No | Describes the pagination on the table
[rowButtons](#rowButtons) | [Object] | No | Row buttons that are prepended to each row
[rowProperties](#rowProperties) | Object | Yes | Properties that describe how to render the rows
[sort](#sort) | Object | No | Object describing the sorting on the table


## Columns

Column object takes the following keys:

- id(*string*): id of the column
- label(*string*): header label of the column


## Events

Events dictate interaction with the table. The events object has the following keys:

- onNext(*function*): Callback when the user hits the next page button
- onPrevious(*function*): Callback when the user hits the previous page button
- onGetPage(*function*): Callback when the user enters a page to retrieve
- onSort(*function*): Callback when the user clicks a column header to sort a column

## PageProperties

Object keys that dictate pagination of the table

- currentPage(*number*): Current page number
- enabled(*number*): True if pagination is enabled; false otherwise
- pageSize(*number*): The maximum size of a page
- recordCount(*number*): The total record count across the entire table

## RowButtons

Buttons that render at the beginning of each row

- icon(*element*): React element to render as the button
- onClick(*function*): Callback when the button is clicked. Signature *(row) => {}*

## RowProperties

Object keys dictating how the row(s) render

- allowSelection(*boolean*): True if rows should have a checkbox that selects the row; false otherwise.
- customColumns(*object*): Custom rendering functions for a column. The object key is a column id that will
render in place of the default render. Signature *(row, { colId, value, _origValue }) => element*
- data(*[Object]*): Data corresponding to the columns array passed in. Each key on a data object corresponds 
to a column id
- ExpandComponent(*function*): A function that renders a react element when a row gets expanded. Row data is passed down as a prop.

## Sort

Object keys determining how the table is sorted

- id(*string*): Id of the column being sorted
- ascending(*boolean*): True if the sorted column is in ascending order; false if the sorted column is in descending order
