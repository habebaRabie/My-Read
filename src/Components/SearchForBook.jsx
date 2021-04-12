import React, {Component} from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import propTypes from 'prop-types'

class SearchForBook extends  Component{

    static propTypes = {
        Books: propTypes.array.isRequired,
    }

    state= {
        query: '',
        Books:[]
    }

    updateQuery =(query)=>{
        this.setState(() =>({
            query: query.trim()
        }))

    }     

    clearQuery = () =>{
        this.updateQuery('')
    }

    displayBooks = query === '' 
        ? BooksAPI.search(query)
            .then(()=>{
                this.setState({SearchingForBooks: []})
            })
        : BooksAPI.search(query)
            .then((Books)=>{
            this.setState({SearchingForBooks: Books})
             })  
    
    render(){

        const {query} = this.state;
        const {Books} = this.props;

                       

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={this.setState({ Books })}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            value={query}
                            onChange={(event)=>{this.updateQuery(event.target.value)}}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {displayBooks.map((book) =>(
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