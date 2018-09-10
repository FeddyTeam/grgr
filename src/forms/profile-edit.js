import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'

const fields = [{
    name: 'id',
    label: 'ID',
    type: 'id'
}, {
    name: 'avatar',
    label: 'AVATAR',
    type: 'avatar'
}, {
    name: 'username',
    label: 'USERNAME',
    type: 'username',
    rules: 'required|string|between:6,24'
}, {
    name: 'email',
    label: 'EMAIL',
    type: 'email',
    rules: 'required|string|between:6,24'
}, {
    name: 'name',
    label: 'NAME',
    type: 'name'
}, {
    name: 'bio',
    label: 'BIO',
    type: 'bio'
}, {
    name: 'url',
    label: 'WEBSITE',
    type: 'bio'
}, {
    name: 'birthday',
    label: 'BIRTHDAY',
    type: 'data'
}]

const plugins = { dvr: validatorjs }

export default new MobxReactForm({ fields }, { plugins })
