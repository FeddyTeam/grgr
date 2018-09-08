import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button, message } from 'antd'
import loginForm from '../../forms/login'

const FormItem = Form.Item

@inject('authStore')
@observer
class Login extends Component {

    async onSubmit(e) {
        e.preventDefault()
        try {
            await this.props.authStore.login(loginForm.values())
            this.props.history.replace('/')
            message.success('WELCOME BACK')
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    render() {
        const $username = loginForm.$('username')
        const $password = loginForm.$('password')
        const { loading } = this.props.authStore

        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <FormItem label={$username.label}>
                        <Input {...$username.bind()} autoComplete='email'/>
                    </FormItem>
                    <FormItem label={$password.label}>
                        <Input {...$password.bind()} autoComplete='current-password'/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" loading={loading} htmlType="submit">LOGIN</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Login
