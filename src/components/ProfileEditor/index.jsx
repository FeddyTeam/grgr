import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { omit } from 'lodash'
import { Link } from 'react-router-dom'
import profileForm from '../../forms/profile-edit'
import { Form, Input, Button, message } from 'antd'
import { AvatarUploader } from '..'

const FormItem = Form.Item

@inject('authStore')
@observer
class ProfileEditor extends Component {

    async onSubmit(e) {
        e.preventDefault()
        try {
            await this.props.authStore.updateProfile(omit(profileForm.values(), ['username', 'email']))

            message.success('SUCCESS')
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    async componentDidMount() {
        await this.props.authStore.fetchProfile()
        const { profile } = this.props.authStore
        profileForm.update(profile)
    }

    render() {
        const { loading } = this.props.authStore
        const $avatar = profileForm.$('avatar')
        const $name = profileForm.$('name')
        // const $username = profileForm.$('username')
        // const $email = profileForm.$('email')
        const $bio = profileForm.$('bio')
        const $url = profileForm.$('url')
        const $birthday = profileForm.$('birthday')

        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <FormItem label={$avatar.label}>
                        <AvatarUploader {...$avatar.bind()} autoComplete='avatar'/>
                    </FormItem>

                    {/* <FormItem label={$email.label}>
                        <Input {...$email.bind()} autoComplete='email'/>
                    </FormItem>
                    <FormItem label={$username.label}>
                        <Input {...$username.bind()} autoComplete='off'/>
                    </FormItem> */}

                    <FormItem label={$name.label}>
                        <Input {...$name.bind()} autoComplete='fullname'/>
                    </FormItem>
                    <FormItem label={$bio.label}>
                        <Input {...$bio.bind()} autoComplete='bio'/>
                    </FormItem>
                    <FormItem label={$url.label}>
                        <Input {...$url.bind()} autoComplete='url'/>
                    </FormItem>

                    <FormItem label={$birthday.label}>
                        <Input {...$birthday.bind()} autoComplete='birthday'/>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" loading={loading} htmlType="submit">UPDATE YOUR PROFILE</Button>
                        {' '}
                        <Button>
                            <Link to="/profile">CANCEL</Link>
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default ProfileEditor
