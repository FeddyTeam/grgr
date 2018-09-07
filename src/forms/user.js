import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'

const fields = [{
    name: 'email',
    // label: 'Email',
    type: 'email',
    rules: 'required|email|string|between:5,32'
}, {
    name: 'username',
    label: 'USERNAME',
    type: 'username',
    rules: 'required|string|between:6,24'
}, {
    name: 'name',
    label: 'NAME',
    type: 'name',
    rules: 'required|string|between:6,24'
}, {
    name: 'status',
    label: 'STATUS'
}, {
    name: 'adm',
    label: 'ADMIN?'
}, {
    name: 'cms',
    label: 'EDITOR?'
}, {
    name: 'abc',
    label: 'BASIC?'
}]

const plugins = { dvr: validatorjs }

export default new MobxReactForm({ fields }, { plugins })
