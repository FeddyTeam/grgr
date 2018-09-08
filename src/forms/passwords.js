import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'

const fields = [{
    name: 'password',
    label: 'PASSWORD',
    type: 'password',
    rules: 'required|string|between:6,24'
}, {
    name: 'newPassword',
    label: 'NEW PASSWORD',
    type: 'password',
    rules: 'required|string|between:6,24'
}, {
    name: 'newPassword2',
    label: 'REPEAT NEW PASSWORD',
    type: 'password',
    rules: 'required|string|between:6,24'
}]

const plugins = { dvr: validatorjs }

export default new MobxReactForm({ fields }, { plugins })
