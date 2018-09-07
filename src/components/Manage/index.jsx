import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import UserList from '../UserList'

@inject('userStore')
@observer
class Manage extends Component {
    render() {
        return (
            <div>
                <p>Manage</p>
                <UserList/>
            </div>
        )
    }
}

export default Manage
