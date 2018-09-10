import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button, message } from 'antd'
import userForm from '../../forms/user-add'
import bindField from '../../lib/formFieldBindings'

const FormItem = Form.Item

userForm.update({
    avatar: 'https://static.feddy.org/avatar.jpg'
})

@inject('authStore', 'userStore')
@observer
class UserCreator extends Component {

    async onSubmit(e) {
        e.preventDefault()
        if (userForm.hasError) return
        try {
            await this.props.userStore.createUser(userForm.values())
            this.props.history.replace('/manage/users/all')

            message.success('SUCCESS')
            userForm.clear()
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
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <FormItem {...bindField($email)}>
                        <Input {...$email.bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem {...bindField($username)}>
                        <Input {...$username.bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem {...bindField($password)}>
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
