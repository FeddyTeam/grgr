import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { omit } from 'lodash'
import { Form, Input, Button, message } from 'antd'
import passwordsForm from '../../forms/passwords'
import bindField from '../../lib/formFieldBindings'

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
                    <FormItem {...bindField($password)}>
                        <Input {...$password.bind()} autoComplete='current-password'/>
                    </FormItem>
                    <FormItem {...bindField($newPass)}>
                        <Input {...$newPass.bind()} autoComplete='new-password'/>
                    </FormItem>
                    <FormItem {...bindField($newPass2)}>
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
