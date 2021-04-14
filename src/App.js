import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import BooksList from './Components/BooksList';
import SearchForBook from './Components/SearchForBook'
import './App.css'


const bookshelves = [
  { key: 'currentlyReading', name: 'Currently Reading' },
  { key: 'wantToRead', name: 'Want to Read' },
  { key: 'read', name: 'Read' }
];

class BooksApp extends Component {

  state = {
    MyBooks: [],
    SearchBooks: [],
    query: ''
  };

  componentDidMount(){
    BooksAPI.getAll()
    .then((Books)=>{
      this.setState(()=>({
        MyBooks: Books
      }))
    })
  }

  updateQuery =(query)=>{
    if(query !== ''){
      this.searchingBooks(query)
    }
    else{
      this.setState({SearchBooks: []})
    }
    this.setState(() =>({
      query: query
    }))
    console.log(query)
  }     

  clearQuery = () =>{
    this.setState(() =>({
      query: '',
      SearchBooks: []
    }))
  }

  searchingBooks = (query) =>{
    BooksAPI.search(query)
    .then((Books)=>{
      console.log(Books)
      if(this.state.query){
        if(Books.error ){
          this.setState({SearchBooks: []})
        }
        else{
          const search = Books.map((searchbook)=>{
            this.state.MyBooks.map((book) =>{
              if(searchbook.id === book.id){
                searchbook.shelf = book.shelf
              }
            })
            return searchbook
          })
          this.setState({SearchBooks: search})
        }
      }

      
    })
  }
        
  //condition if => the user choose none else => another option
  MovingBooksToAnotherShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then((Book) => {
      console.log(Book)
    })
    if (shelf === 'none'){
      this.setState((currentstate) => ({
        MyBooks: currentstate.MyBooks.filter((e) => {
          return e.id !== book.id
        })
      }))
    }
    else{

      const Mynewbooks = this.state.MyBooks
      if(book.shelf === undefined){
        Mynewbooks.push({
          ...book,
          shelf: shelf
        })
      }
      else{
        this.state.MyBooks.map((updatedbook)=>{
          if(updatedbook.id === book.id){
            updatedbook.shelf = shelf
          }
          return (updatedbook)
        })
      }
      }
      

      const NewSearchBook = this.state.SearchBooks.map((updatedSearchBook)=>{
        if(updatedSearchBook.id === book.id){
          updatedSearchBook.shelf = shelf
        }
        
        return (updatedSearchBook)
      })

      this.setState(() => ({
        SearchBooks: NewSearchBook
      }))
    }

  render() {
    return (
      <div className="app">
        <Route path='/' exact 
          render={()=>(
            <BooksList
              MyBooks={this.state.MyBooks}
              SearchBooks={this.state.SearchBooks}
              searchingBooks = {this.searchingBooks}
              bookshelves = {bookshelves}
              MovingBooksToAnotherShelf = {this.MovingBooksToAnotherShelf}
              query= {this.state.query}
              updateQuery = {this.updateQuery}
              clearQuery = {this.clearQuery}
              // validationImage = {this.validationImage}
            />
          )}
        />

        <Route path='/search' render={()=>(
            <SearchForBook
              SearchBooks={this.state.SearchBooks}
              MyBooks={this.state.MyBooks}
              MovingBooksToAnotherShelf = {this.MovingBooksToAnotherShelf}
              query= {this.state.query}
              updateQuery = {this.updateQuery}
              clearQuery = {this.clearQuery}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
