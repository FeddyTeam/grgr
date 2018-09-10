import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { omit } from 'lodash'
import { Link } from 'react-router-dom'
import profileForm from '../../forms/profile-edit'
import bindField from '../../lib/formFieldBindings'
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
                    <FormItem {...bindField($avatar)}>
                        <AvatarUploader {...$avatar.bind()} autoComplete='avatar'/>
                    </FormItem>

                    {/* <FormItem {...bindField($email)}>
                        <Input {...$email.bind()} autoComplete='email'/>
                    </FormItem>
                    <FormItem {...bindField($username)}>
                        <Input {...$username.bind()} autoComplete='off'/>
                    </FormItem> */}

                    <FormItem {...bindField($name)}>
                        <Input {...$name.bind()} autoComplete='fullname'/>
                    </FormItem>
                    <FormItem {...bindField($bio)}>
                        <Input {...$bio.bind()} autoComplete='bio'/>
                    </FormItem>
                    <FormItem {...bindField($url)}>
                        <Input {...$url.bind()} autoComplete='url'/>
                    </FormItem>

                    <FormItem {...bindField($birthday)}>
                        <Input {...$birthday.bind()} autoComplete='birthday' disabled/>
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
