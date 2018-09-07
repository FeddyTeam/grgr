import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { pick } from 'lodash'

import { Table, Tag, Switch, Button, Form, Input, Modal, Select, Checkbox, message } from 'antd'
import userForm from '../../forms/user'

const FormItem = Form.Item
const Option = Select.Option

@inject('userStore')
@observer
class UserList extends Component {

    constructor(props) {
        super(props)

        this.editUser = this.editUser.bind(this)

        this.state = {
            columns: [{
                title: 'Avatar',
                dataIndex: 'avatar',
                key: 'avatar',
                render: avatar => <img src={avatar} height="32"/>
            }, {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: 'Username',
                dataIndex: 'username',
                key: 'username'
            }, {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            }, {
                title: 'Admin?',
                dataIndex: 'adm',
                key: 'adm',
                render: adm => adm && <Tag>Admin</Tag>
            }, {
                title: 'Editor?',
                dataIndex: 'cms',
                key: 'cms',
                render: cms => cms && <Tag>Editor</Tag>
            }, {
                title: 'Basic?',
                dataIndex: 'abc',
                key: 'abc',
                render: abc => abc && <Tag>Basic</Tag>
            }, {
                title: 'Actions',
                dataIndex: 'id',
                key: 'edit',
                render: (id, row) => <Button onClick={e => this.editUser(row)}>Edit</Button>
            }]
        }
    }

    async editUser(user) {
        this.props.userStore.openModal()
        userForm.init({
            ...pick(user, [
                'id', 'username', 'email', 'cms', 'adm', 'abc', 'status', 'name'
            ])
        })
    }

    closeModal() {
        this.props.userStore.closeModal()
    }

    async onSubmit(event) {
        event.preventDefault()
        try {
            await this.props.userStore.updateUser(userForm)

            message.success('SUCCESS')
            this.props.userStore.closeModal()
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    render() {
        window.__userForm = userForm
        const $username = userForm.$('username')
        const $email = userForm.$('email')
        const $name = userForm.$('name')
        const $status = userForm.$('status')
        const $adm = userForm.$('adm')
        const $cms = userForm.$('cms')
        const $abc = userForm.$('abc')
        const { loading, users } = this.props.userStore

        return (
            <div>
                <Table rowKey='id' columns={this.state.columns} dataSource={users} />
                <Modal
                    title="UPDATE USER"
                    visible={this.props.userStore.modalVisible}
                    onOk={this.onSubmit.bind(this)}
                    onCancel={this.props.userStore.closeModal}
                >
                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <FormItem label={$email.label}>
                            <Input {...$email.bind()} autoComplete='email'/>
                        </FormItem>
                        <FormItem label={$username.label}>
                            <Input {...$username.bind()} autoComplete='username'/>
                        </FormItem>
                        <FormItem label={$name.label}>
                            <Input {...$name.bind()} autoComplete='on'/>
                        </FormItem>
                        <FormItem label={$status.label}>
                            <Select {...$status.bind()}>
                                <Option value='pending'>pending</Option>
                                <Option value='actived'>actived</Option>
                                <Option value='deleted'>deleted</Option>
                                <Option value='locked'>locked</Option>
                            </Select>
                        </FormItem>
                        <FormItem label={$adm.label}>
                            <Switch checked={$adm.value} onChange={$adm.onChange}/>
                        </FormItem>
                        <FormItem label={$cms.label}>
                            <Switch checked={$cms.value} onChange={$cms.onChange}/>
                        </FormItem>
                        <FormItem label={$abc.label}>
                            <Switch checked={$abc.value} onChange={$abc.onChange}/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" loading={loading} htmlType="submit">SAVE</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }

    componentWillMount() {
        this.props.userStore.fetchUsers().then()
    }
}

export default UserList
