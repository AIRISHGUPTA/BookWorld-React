import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Search from './Search'
import './index.css'
import {BrowserRouter,Route} from 'react-router-dom'
ReactDOM.render(
<BrowserRouter>
<div>
  <Route exact path="/" render={()=>(
    <App/>
  )}/>
  <Route exact path='/search' render={()=>(
    <Search/>
  )}/>
</div>
</BrowserRouter>
  , document.getElementById('root'))
