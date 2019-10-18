# TableMain

The data table without the header

Props | Type | Required | Description
----- | ---- | -------- | -----------
columns | [Object] | Yes | List of objects describing the columns structure
customClasses | Object | No | Custom classes to apply to different parts of the table
events | Object | No | Handle events triggered by user actions
expandable | Boolean | No | True if rows can be expanded; false otherwise
id | String | No | Id attached to the table DOM
pageProperties | Object | No | Describes the pagination on the table
rowButtons | [Object] | No | Row buttons that are prepended to each row
rowProperties | Object | Yes | Properties that describe how to render the rows
sort | Object | No | Object describing the sorting on the table
