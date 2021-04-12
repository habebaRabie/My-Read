import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import BooksList from './Components/BooksList';
import SearchForBook from './Components/SearchForBook'
import './App.css'


const bookshelves = [
  { key: 'CurrentlyReading', name: 'Currently Reading' },
  { key: 'WantToRead', name: 'Want to Read' },
  { key: 'Read', name: 'Read' }
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
    this.setState(() =>({
      query: query.trim()
    }))
  }     

  clearQuery = () =>{
    this.updateQuery('')
  }


  searchingBooks = query === '' 
        ? BooksAPI.search(query)
            .then(()=>{
                this.setState({SearchBooks: []})
            })
        : BooksAPI.search(query)
            .then((Books)=>{
            this.setState({SearchBooks: Books})
             }) 

  //condition if => the user choose none else => another option
  MovingBooksToAnotherShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    if (shelf === 'none'){
      this.setState((currentstate) => ({
        MyBooks: currentstate.MyBooks.filter((e) => {
          return e.id !== book.id
        })
      }))
    }else{
      this.setState((currentstate) => ({
        MyBooks: currentstate.MyBooks.filter((e) => e.id !== book.id).concat(book)
      }))
    }
  }
  

  render() {
    return (
      <div className="app">
        <Route path='/' exact 
          render={()=>(
            <BooksList
              MyBooks={this.state.MyBooks}
              bookshelves = {this.bookshelves}
              MovingBooksToAnotherShelf = {this.MovingBooksToAnotherShelf}
              query= {this.query}
              updateQuery = {this.updateQuery}
              clearQuery = {this.clearQuery}
            />
          )}
        />

        <Route path='/search' render={()=>(
            <SearchForBook
              SearchBooks={this.state.SearchBooks}
              MyBooks={this.state.MyBooks}
              MovingBooksToAnotherShelf = {this.MovingBooksToAnotherShelf}
              query= {this.query}
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
