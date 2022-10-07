import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import BoardInsert from './BoardInsert'
import BoardList from './BoardList'
import BoardRead from './BoardRead'
import BoardUpdate from './BoardUpdate'
import HeaderPage from './HeaderPage'

const BoardPage = () => {

  return (
    <div>
      <HeaderPage/>
        <div className='sub_menu'>
            <Link to="/board/list">list</Link>
            {sessionStorage.getItem('uid') &&  <Link to="/board/insert">insert</Link>}
           
        </div>
        <hr/>
        <Switch>
            <Route path="/board/list" component={BoardList}/>
            <Route path="/board/insert" component={BoardInsert}/>
            <Route path="/board/read/:bno" component={BoardRead}/>
            <Route path="/board/update/:bno" component={BoardUpdate}/>
        </Switch>
    </div>
  )
}

export default BoardPage