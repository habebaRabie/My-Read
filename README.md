# MyReads Project

This project is a library of books and the user has the ability to search for ant book and add it to his books
the user's books are divided into 3 categories
1- The books that he is reading and haven't finished it yet (Currently Reading)
2- The books that he wants to read (Want to Read)
3- The books that he have finished it already (Read)

## To start running the project

To get started developing right away:

* you can install all project dependencies with `npm install`
* To start the development server use `npm start`


## Backend Server

The provided file [`BooksAPI.js`](src/BooksAPI.js) contains all the methods that deal with the API on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

* Returns a Promise which resolves to a JSON object all the books that are currently in the bookshelves in your app.

### `update`

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of the shelves that are already exist in the page
["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request to update the current book array

### `search`

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on so we use this function to search about the book in our array book