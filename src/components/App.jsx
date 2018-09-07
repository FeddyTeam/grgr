import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { Login, Hello, CMS, Manage } from '../components'

const { Header, Content, Footer } = Layout

class App extends React.Component {
    render() {
        return (
            <div className="grgr">
                <Layout>
                    <Header>
                        <Menu
                            style={{ lineHeight: '64px' }}
                            theme="dark"
                            mode="horizontal">
                            <Menu.Item key="/">
                                <Link to="/">INDEX</Link>
                            </Menu.Item>
                            <Menu.Item key="/cms">
                                <Link to="/cms">CMS</Link>
                            </Menu.Item>
                            <Menu.Item key="/manage">
                                <Link to="/manage">MANAGE</Link>
                            </Menu.Item>
                            <Menu.Item key="/login">
                                <Link to="/login">LOGIN</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content
                        style={{ minHeight: '100vh', padding: '20px' }}>
                        <Route exact path="/" component={Hello}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/cms" component={CMS}/>
                        <Route path="/manage" component={Manage}/>
                    </Content>
                    <Footer></Footer>
                </Layout>
            </div>
        )
    }
}

export default App
