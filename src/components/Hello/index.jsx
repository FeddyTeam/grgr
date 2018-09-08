import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'

@inject('authStore')
@observer
class Hello extends Component {
    render() {
        const { keys, profile, loading } = this.props.authStore

        return (
            <div>
                {keys.lgd ?
                    <div>
                        <span>Hello: </span>
                        <h1>
                            {loading && <Icon type='loading' />}
                            {profile.name}
                        </h1>
                    </div> : <Link to='/login'>Login</Link>}
            </div>
        )
    }
}

export default Hello
