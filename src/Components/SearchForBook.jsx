import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

class SearchForBook extends Component{

    render(){                  
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search" onClick={this.props.clearQuery}>Close</button> 
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            value={this.props.query}
                            onChange={(event)=>{this.props.updateQuery(event.target.value)}}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.SearchBooks.map((book, index) =>(
                             <Book key={index} book={book} MovingBooksToAnotherShelf={this.props.MovingBooksToAnotherShelf} />
                        ))}
                    </ol>

                </div>
          </div>
        )
    }   
}

export default SearchForBook