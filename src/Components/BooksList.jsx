import React, {Component} from 'react'
import Book from './Book'

class BooksList extends Component{

    // state = {
    //     CurrentlyReading: [],
    //     WanttoRead: [],
    //     Read: []
    // };
    
    // BooksAPI.get(this.props.book.id)
    // .then((Books)=>{
    //   this.setState(()=>({
    //     Books
    //   }))
    // })



    render(){
        return (
            <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {/* <Book /> */}
                                </ol>
                            </div>
                        </div>
                    
                    </div>
                </div>
                <div className="open-search">
                  <button onClick={() => this.setState()}>Add a book</button>
                </div>
            </div>
        )
    }
    
}

export default BooksList