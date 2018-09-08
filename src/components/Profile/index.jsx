import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'

@inject('authStore')
@observer
class Profile extends Component {

    render() {
        const { profile } = this.props.authStore

        return (
            <div>
                <Link to="/passwords">CHANGE PASSWORD</Link>
                <Card
                    title={profile.name}
                    cover={<img src={profile.avatar} alt="Avatar"/>}
                    style={{ width: 240 }}>
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                </Card>
            </div>
        )
    }
}

export default Profile
