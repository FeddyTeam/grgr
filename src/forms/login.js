import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'

const fields = [{
    name: 'username',
    label: 'EMAIL',
    type: 'email',
    rules: 'required|email|string|between:5,32'
}, {
    name: 'password',
    label: 'PASSWORD',
    type: 'password',
    rules: 'required|string|between:6,24'
}]

const plugins = { dvr: validatorjs }

export default new MobxReactForm({ fields }, { plugins })
