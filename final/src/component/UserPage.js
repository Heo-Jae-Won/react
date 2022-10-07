import React from 'react'
import { Route } from 'react-router-dom'
import HeaderPage from './HeaderPage'
import UserInsert from './UserInsert'
import UserList from './UserList'

const UserPage = () => {
  return (
    <div>
      <HeaderPage/>

      <Route path="/user/insert" component={UserInsert} exact/>
      <Route path="/user/list" component={UserList} exact/>
    </div>
  )
}

export default UserPage