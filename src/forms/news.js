import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'

const fields = [{
    name: 'status',
    label: 'STATUS',
    type: 'text'
}, {
    name: 'level',
    label: 'LEVEL',
    type: 'text'
}, {
    name: 'type',
    label: 'TYPE',
    type: 'text'
}, {
    name: 'title',
    label: 'TITLE',
    type: 'text'
}, {
    name: 'altTitle',
    label: 'ALT TITLE',
    type: 'text',
},  {
    name: 'content',
    label: 'CONTENT / DESCRIPTION',
    type: 'text',
}, {
    name: 'image',
    label: 'IMAGE',
    type: 'text',
},  {
    name: 'altImage',
    label: 'ALT IMAGE',
    type: 'text',
}, {
    name: 'thumbnail',
    label: 'THUMBNAIL',
    type: 'text',
}, {
    name: 'link',
    label: 'LINK',
    type: 'text',
}, {
    name: 'color',
    label: 'THEME COLOR',
    type: 'color',
}, {
    name: 'userId',
    label: 'User ID',
    type: 'text'
}, {
    name: 'id',
    label: 'ID',
    type: 'text'
}]

const plugins = { dvr: validatorjs }

export default new MobxReactForm({ fields }, { plugins })
