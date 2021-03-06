import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { pick } from 'lodash'

import { Table, Tag, Switch, Button, Form, Input, Modal, Select, Row, Col, message } from 'antd'
import { AvatarUploader } from '..'
import userForm from '../../forms/user'
import bindField from '../../lib/formFieldBindings'

const FormItem = Form.Item
const Option = Select.Option

const statusTag = status => {
    const colors = {
        pending: 'green',
        actived: 'blue',
        deleted: 'orange',
        locked: 'purple'
    }

    return <Tag color={colors[status]}>{status}</Tag>
}

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
                render: avatar => <img src={avatar} alt='Avatar' height="32"/>
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
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: statusTag
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
        userForm.update({
            ...pick(user, [
                'id', 'username', 'email', 'cms', 'adm', 'abc', 'status', 'name', 'avatar'
            ])
        })
    }

    closeModal() {
        this.props.userStore.closeModal()
    }

    async onSubmit(event) {
        event.preventDefault()
        try {
            await this.props.userStore.updateUser(userForm.values())

            message.success('SUCCESS')
            this.props.userStore.closeModal()
            userForm.clear()
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    render() {
        const $avatar = userForm.$('avatar')
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
                    onCancel={e => this.props.userStore.closeModal()}
                >
                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <FormItem {...bindField($avatar)}>
                            <AvatarUploader {...$avatar.bind()}/>
                        </FormItem>
                        <FormItem {...bindField($email)}>
                            <Input {...$email.bind()} autoComplete='email'/>
                        </FormItem>
                        <FormItem {...bindField($username)}>
                            <Input {...$username.bind()} autoComplete='username'/>
                        </FormItem>
                        <FormItem {...bindField($name)}>
                            <Input {...$name.bind()} autoComplete='on'/>
                        </FormItem>
                        <FormItem {...bindField($status)}>
                            <Select {...$status.bind()}>
                                <Option value='pending'>pending</Option>
                                <Option value='actived'>actived</Option>
                                <Option value='deleted'>deleted</Option>
                                <Option value='locked'>locked</Option>
                            </Select>
                        </FormItem>
                        <Row gutter={10}>
                            <Col span={8}>
                                <FormItem {...bindField($adm)}>
                                    <Switch checked={$adm.value} onChange={$adm.onChange}/>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...bindField($cms)}>
                                    <Switch checked={$cms.value} onChange={$cms.onChange}/>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...bindField($abc)}>
                                    <Switch checked={$abc.value} onChange={$abc.onChange}/>
                                </FormItem>
                            </Col>
                        </Row>

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
        // TODO: apollo-client has cache, so...
        /**
         * detail:
         *
         * - apollo-client has cache for same query
         * - this method would be called every time
         * - user create is in another component
         *
         * as a result user created -> users store updated -> fetch users automantically -> users updated again, with old values
         */
    }
}

export default UserList
