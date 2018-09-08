import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { omit } from 'lodash'
import { Form, Input, Button, message } from 'antd'
import passwordsForm from '../../forms/passwords'

const FormItem = Form.Item

@inject('authStore')
@observer
class Login extends Component {

    async onSubmit(e) {
        e.preventDefault()
        try {
            await this.props.authStore.updatePassword(omit(passwordsForm.values(), 'newPassword2'))
            this.props.history.replace('/profile')

            message.success('SUCCESS')
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    render() {
        const $password = passwordsForm.$('password')
        const $newPass = passwordsForm.$('newPassword')
        const $newPass2 = passwordsForm.$('newPassword2')
        const { loading } = this.props.authStore

        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <FormItem label={$password.label}>
                        <Input {...$password.bind()} autoComplete='current-password'/>
                    </FormItem>
                    <FormItem label={$newPass.label}>
                        <Input {...$newPass.bind()} autoComplete='new-password'/>
                    </FormItem>
                    <FormItem label={$newPass2.label}>
                        <Input {...$newPass2.bind()} autoComplete='new-password'/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" loading={loading} htmlType="submit">UPDATE YOUR PASSWORD</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Login
