import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { message } from 'antd'

@inject('authStore')
class Login extends Component {

    componentWillMount() {
        this.props.authStore.logout()
        message.info('Bye~')
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default Login
