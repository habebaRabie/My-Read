import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import BooksList from './Components/BooksList';
import SearchForBook from './Components/SearchForBook'

import './App.css'

class BooksApp extends Component {

  state = {
    MyBooks: [],
    SearchBooks: []
  };

  componentDidMount(){
    BooksAPI.getAll()
    .then((Books)=>{
      this.setState(()=>({
        MyBooks: Books
      }))
    })
  }

  //condition if => the user choose none else => another option
  update = (book, shelf) => {
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
        <Route path='/' exact component={BooksList}/>
        <Route path='/search' component={SearchForBook}/>
      </div>
    )
  }
}

export default BooksApp
