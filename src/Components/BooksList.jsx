import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'


class BooksList extends Component{


    render(){
        return (
            <div className="list-books">
                <div className="list-books-title">
                  <h1>My Reads</h1>
                </div>

                <div className="list-books-content">
                    {this.props.bookshelves.map((shelf, i) =>{
                        return(
                            <div key={i}>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">{shelf.name}</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {/* Render list of books */}
                                            {console.log(this.props.MyBooks)}
                                            {this.props.MyBooks.filter((book) => (book.shelf === shelf.key)).map((item, index) => {
                                                // Return book component
                                                // Pass props to book component
                                                return <Book key={index} book={item} MovingBooksToAnotherShelf={this.props.MovingBooksToAnotherShelf}/>})}
                                        </ol>
                                    </div>
                                </div>
                        
                            </div>
                        )
                       
                    })}
                    
                </div>
                <div className="open-search">
                    <Link to='/search'>
                        <button >Add a book</button>
                    </Link>

                  
                </div>
            </div>
        )
    }
    
}

export default BooksList