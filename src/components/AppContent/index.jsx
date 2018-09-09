import React from 'react'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Layout } from 'antd'
import { Login, Hello, CMS, Manage, Profile, Passwords, Exit, AvatarUploader } from '..'

const { Content } = Layout

@inject('authStore')
@observer
class AppContent extends React.Component {
    componentWillMount() {
        this.props.authStore.loadToken()
    }

    render() {
        const { keys } = this.props.authStore

        return (
            <Content
                style={{ minHeight: '100vh', padding: '20px' }}>
                <Route exact path="/" component={Hello}/>
                <Route path="/login" component={Login}/>
                {keys.cms && <Route path="/cms" component={CMS}/>}
                {keys.adm && <Route path="/manage" component={Manage}/>}
                {keys.lgd && <Route path="/profile" component={Profile}/>}
                {keys.lgd && <Route path="/passwords" component={Passwords}/>}
                {keys.lgd && <Route path="/exit" component={Exit}/>}

                <Route path='/avatar-uploader' component={AvatarUploader}/>
            </Content>
        )
    }
}

export default AppContent
