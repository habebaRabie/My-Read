import React, {Component} from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import propTypes from 'prop-types'

class SearchForBook extends Component{

    // static propTypes = {
    //     Books: propTypes.array.isRequired,
    // }

    render(){                  

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={ this.clearQuery }>Close</button> 
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            value={this.query}
                            onChange={(event)=>{this.updateQuery(event.target.value)}}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.searchingBooks.map((book) =>(
                            <li key= {book.id}>
                                <div>
                                    <Book book={book}/>
                                </div>
                            </li>
                        ))}
                    </ol>

                </div>
          </div>
        )
    }
    
}

export default SearchForBook