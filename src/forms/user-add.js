import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'

const fields = [{
    name: 'email',
    label: 'EMAIL',
    type: 'email',
    rules: 'required|email|string|between:5,32'
}, {
    name: 'username',
    label: 'USERNAME',
    type: 'text',
    rules: 'required|string|between:6,24'
}, {
    name: 'password',
    label: 'PASSWORD',
    type: 'text',
    rules: 'required|string|between:6,24'
}]

const plugins = { dvr: validatorjs }

export default new MobxReactForm({ fields }, { plugins })
