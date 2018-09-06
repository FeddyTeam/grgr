import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item

@inject('authStore')
class Login extends Component {
    render() {
        return (
            <div>
                <Form>
                    <FormItem>
                        <Input type="email" placeholder="Username" />
                    </FormItem>
                    <FormItem>
                        <Input type="password" placeholder="Password" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">LOGIN</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Login
