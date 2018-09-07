import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('authStore')
@observer
class Hello extends Component {
    render() {
        const { profile } = this.props.authStore

        return (
            <div>
                <h1>Welcome: {profile.name}</h1>
            </div>
        )
    }
}

export default Hello
