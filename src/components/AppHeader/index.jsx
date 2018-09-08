import React from 'react'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Layout, Menu, Icon } from 'antd'

const { Header } = Layout

@inject('authStore')
@observer
class AppHeader extends React.Component {
    render() {
        const { keys, loading, profile } = this.props.authStore

        return (
            <Header>
                <Menu
                    style={{ lineHeight: '64px' }}
                    theme="dark"
                    mode="horizontal">
                    <Menu.Item key="/">
                        <Link to="/">INDEX</Link>
                    </Menu.Item>
                    {keys.cms && <Menu.Item key="/cms">
                        <Link to="/cms">CMS</Link>
                    </Menu.Item>}
                    {keys.adm && <Menu.Item key="/manage/users">
                        <Link to="/manage/users">MANAGE</Link>
                    </Menu.Item>}
                    {keys.lgd && <Menu.Item key="/profile">
                        <Link to="/profile">
                            {loading && <Icon type='loading'/>}
                            {profile.name}
                        </Link>
                    </Menu.Item>}
                    {!keys.lgd && <Menu.Item key="/login">
                        <Link to="/login">LOGIN</Link>
                    </Menu.Item>}
                    {keys.lgd && <Menu.Item key="/exit">
                        <Link to="/exit">EXIT</Link>
                    </Menu.Item>}
                </Menu>
            </Header>
        )
    }
}

export default AppHeader
