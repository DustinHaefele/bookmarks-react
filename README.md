# Bookmarks React Client
_This project is a demonstration for Thinkful's React course_

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


#BUG NOTES 
  When article is deleted it doesn't rerender the page so you see it even though it is removed from the database.  If you refresh it is gone.

#REQUIREMENTS 

***The React project should be using your local bookmarks API as its API_ENDPOINT for local development.

***Create a new Route that will contain a form for editing bookmarks

Create a component that contains a form for updating bookmarks

On your list of bookmarks, add a button/link on each bookmark that links to the edit route for that bookmark

You can either: use a Link from react-router-dom
or use a button that calls history.push when it's clicked

The edit bookmark form should display fields that are pre-populated with the existing bookmark's field values

The edit bookmark form should submit a PATCH request to your bookmarks-server with the new bookmark field values

If the PATCH request is successful, update the bookmark stored in context with the new values and redirect the user back to the list of bookmarks


