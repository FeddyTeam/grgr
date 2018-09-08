import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link, Route } from 'react-router-dom'

import { Menu } from 'antd'

import UserList from '../UserList'
import UserForm from '../UserForm'

@inject('userStore')
@observer
class Manage extends Component {
    render() {
        return (
            <div>
                <Menu mode="horizontal">
                    <Menu.Item key="/manage/users/all">
                        <Link to="/manage/users/all">
                            USERS
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/manage/users/add">
                        <Link to="/manage/users/add">
                            CREATE USER
                        </Link>
                    </Menu.Item>
                </Menu>

                <Route exact path="/manage/users/all" component={UserList}/>
                <Route exact path="/manage/users/add" component={UserForm}/>
            </div>
        )
    }
}

export default Manage
