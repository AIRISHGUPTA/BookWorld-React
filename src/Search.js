import React,{Component} from 'react'
import {Route,Link} from 'react-router-dom'
import SortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
class Search extends React.Component
{
  state={
    keyword:'',
  }
  search=(e)=>{
    this.setState({keyword:e.target.value});
      BooksAPI.search(this.state.keyword).then((data)=>{
        this.setState({books:data});
      });

  }
  updateBookSelected=(e,book)=>
  {
    book.shelf=e.target.value;
    BooksAPI.update(book,e.target.value);
    this.setState({books:this.state.books.map((x)=>{
      if(x.id==book.id)
      {
        x.shelf=e.target.value;
      }
      return x;
    })});
  }

  render()
  {
    console.log(this.state);
    return (
      <div className="search-books">
        <div className="search-books-bar">
            <Link to="/" className="close-search"> BACK </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.search}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books && this.state.books.map((book)=>
              (<li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(e)=>this.updateBookSelected(e,book)}>
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
    )
  }
}
export default Search;
