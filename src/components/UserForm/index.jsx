import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button, message } from 'antd'
import userForm from '../../forms/user-add'

const FormItem = Form.Item

@inject('authStore', 'userStore')
@observer
class UserCreator extends Component {

    async onSubmit(e) {
        e.preventDefault()
        try {
            await this.props.userStore.createUser(userForm.values())
            this.props.history.replace('/manage/users/all')

            message.success('SUCCESS')
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    render() {
        const $email = userForm.$('email')
        const $username = userForm.$('username')
        const $password = userForm.$('password')
        const { loading } = this.props.userStore

        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)} autoComplete='off'>
                    <FormItem label={$email.label}>
                        <Input {...$email.bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem label={$username.label}>
                        <Input {...$username.bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem label={$password.label}>
                        <Input {...$password.bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" loading={loading} htmlType="submit">CREATE</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default UserCreator
