import React from 'react'
import { inject } from 'mobx-react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import {  AppHeader, AppContent, AppFooter } from '../components'

@inject('authStore')
class App extends React.Component {
    componentWillMount() {
        this.props.authStore.loadToken()
    }

    render() {
        return (
            <div className="grgr">
                <Layout>
                    <AppHeader/>
                    <Route component={AppContent}/>
                    <AppFooter/>
                </Layout>
            </div>
        )
    }
}

export default App
