import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksApi from './BooksAPI';

import {Route,Link} from 'react-router-dom'

class App extends React.Component {
  state = {
    showSearchPage: false
  }
  componentDidMount()
  {
    BooksApi.getAll().then((books)=>{
      let current=[];
      let read=[];
      let wantToRead=[];
      for(let book of books)
      {
        if(book.shelf === 'currentlyReading')
        {
            current.push(book);
        }
        else if(book.shelf === 'wantToRead')
        {
          wantToRead.push(book);
        }
        else if (book.shelf === 'read')
        {
          read.push(book);
        }
      }
      this.setState({
        current,
        read,
        wantToRead
      })
    });

  }
  updateBookSelected=(event,book)=>{
    BooksApi.update(book,event.target.value);

          if(book.shelf==='currentlyReading')
          {
            this.setState({current:this.state.current.filter((x)=>(x.title!=book.title))});
          }
          else if(book.shelf==='wantToRead')
          {
            this.setState({wantToRead:this.state.wantToRead.filter((x)=>(x.title!=book.title))});
          }
          else if(book.shelf==='read')
          {
            this.setState({read:this.state.read.filter((x)=>(x.title!=book.title))});
          }
          if(event.target.value==='currentlyReading')
          {
            book.shelf=event.target.value;
            let array=this.state.current;
              array.push(book);
              this.setState({current:array});
          }
          else if(event.target.value==='wantToRead')
          {
            book.shelf=event.target.value;
            let array=this.state.wantToRead;
            array.push(book);
            this.setState({wantToRead:array});
          }
          else if(event.target.value==='read')
          {
            book.shelf=event.target.value;
            let array=this.state.read;
            array.push(book);
            this.setState({read:array});
          }

  }
  render() {
    return (

      <div className="app">

        <div>
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
                          {this.state.current && this.state.current.map((book)=>
                            (<li key={book.title}>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                  <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={(e)=>this.updateBookSelected(e,book)}>
                                      <option value="none" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                              </div>
                            </li>)
                          )}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">READ</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {this.state.read && this.state.read.map((book)=>
                            (<li key={book.title}>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                  <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={(e)=>this.updateBookSelected(e,book)}>
                                      <option value="none" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                              </div>
                            </li>)
                          )}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">WANT TO READ</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {this.state.wantToRead && this.state.wantToRead.map((book)=>
                            (<li key={book.title}>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                  <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={(e)=>this.updateBookSelected(e,book)}>
                                      <option value="none" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                              </div>
                            </li>)
                          )}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
          </div>

      </div>
    )
  }
}

export default App
