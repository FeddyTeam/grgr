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
            await this.props.authStore.login(loginForm)
            this.props.history.replace('/')

            message.success('WELCOME BACK')
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    render() {
        const $email = loginForm.$('email')
        const $username = loginForm.$('username')
        const $password = loginForm.$('password')
        const { loading } = this.props.authStore

        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <FormItem>
                        <Input {...$email.bind()} />
                    </FormItem>
                    <FormItem>
                        <Input {...$username.bind()} />
                    </FormItem>
                    <FormItem>
                        <Input {...$password.bind()} />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" loading={loading} htmlType="submit">CREATE</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Login
