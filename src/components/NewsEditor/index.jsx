import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { omit, isEmpty } from 'lodash'

import { AvatarUploader, PhotoUploader } from '..'
import { Form, Input, Button, Select, Row, Col, message } from 'antd'
import newsForm from '../../forms/news'
import bindField from '../../lib/formFieldBindings'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

@inject('newsStore')
@observer
class CMS extends Component {

    async onSubmit(e) {
        e.preventDefault()
        if (newsForm.hasError) return
        try {
            if (this.props.newsStore.currentId) {
                await this.props.newsStore.updateNews(newsForm.values())
            } else {
                const { id } = await this.props.newsStore.createNews(omit(newsForm.values(), 'id'))
                this.props.history.replace(`/cms/edit/${id}`)
            }

            message.success('SUCCESS: 已经自动重定向，可以继续编辑和保存')
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }
    }

    componentWillMount() {
        const { id } = this.props.match.params
        if (id) {
            // TODO: fetch news from server
            this.props.newsStore.setCurrentId(id)
            const news = this.props.newsStore.currentNews

            if (isEmpty(news)) {
                message.error('ERROR: Hmm，你发现了华点，我忘记添加编辑前从线上拉数据的功能，我的意思是，编辑状态不要刷新')
                this.props.history.replace('/cms')
                return
            }

            newsForm.update(news) // contains a id
        } else {
            // TODO: Delete this fake data
            newsForm.update({
                title: 'undefined (伪)',
                altTitle: '',
                content: '这是一条默认内容，图片预设为 Sakura，链接预设为 Google，主题色预设为 #ffffff，状态预设为 draft，发布前请修改',

                image: 'https://static.feddy.org/FtnqM8NupRtfw_2-BUArl_nl_GiV?imageView2/0/w/1200/q/50',
                altImage: 'https://static.feddy.org/FtnqM8NupRtfw_2-BUArl_nl_GiV?imageView2/1/w/640/h/480',
                thumbnail: 'https://static.feddy.org/FtnqM8NupRtfw_2-BUArl_nl_GiV?imageView2/1/w/256',

                status: 'draft',
                type: 'news',
                level: 'normal',

                link: 'https://google.com',

                color: '#FEDFE1',

                id: null,
                userId: 'fake-user-id'
            })
        }
    }

    render() {
        const { loading, statusOptions, levelOptions, typeOptions } = this.props.newsStore

        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <Row gutter={10}>
                        <Col span={8}>
                            <FormItem label={newsForm.$('type').label}>
                                <Select  {...newsForm.$('type').bind()}>
                                    {typeOptions.map(opt => <Option value={opt} key={opt}>{opt}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={newsForm.$('level').label}>
                                <Select  {...newsForm.$('level').bind()}>
                                    {levelOptions.map(opt => <Option value={opt} key={opt}>{opt}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={newsForm.$('status').label}>
                                <Select  {...newsForm.$('status').bind()}>
                                    {statusOptions.map(opt => <Option value={opt} key={opt}>{opt}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>

                    <FormItem {...bindField(newsForm.$('title'))}>
                        <Input {...newsForm.$('title').bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem label={newsForm.$('altTitle').label}>
                        <Input {...newsForm.$('altTitle').bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem label={newsForm.$('content').label}>
                        <TextArea {...newsForm.$('content').bind()} autoComplete='off'/>
                    </FormItem>

                    <Row gutter={10}>
                        <Col span={12}>
                            <FormItem label={newsForm.$('image').label}>
                                <PhotoUploader imageView='?imageView2/0/w/1200/q/50' {...newsForm.$('image').bind()}/>
                                <Input style={{ maxWidth: '640px' }} {...newsForm.$('image').bind()} autoComplete='off'/>
                                <div>
                                    <Button icon="link" target="_blank" href="https://developer.qiniu.com/dora/manual/1279/basic-processing-images-imageview2">七牛图片基本处理</Button>
                                    <Button icon="github" target="_blank" href="https://github.com/FeddyTeam/grgr/issues/1">讨论下图片尺寸</Button>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={newsForm.$('altImage').label}>
                                <PhotoUploader imageView='?imageView2/1/w/640/h/480' {...newsForm.$('altImage').bind()}/>
                                <Input {...newsForm.$('altImage').bind()} autoComplete='off'/>
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem label={newsForm.$('thumbnail').label}>
                                <PhotoUploader imageView='?imageView2/1/w/256' {...newsForm.$('thumbnail').bind()}/>
                                <Input {...newsForm.$('thumbnail').bind()} autoComplete='off'/>
                            </FormItem>
                        </Col>
                    </Row>

                    <FormItem label={newsForm.$('link').label}>
                        <Input {...newsForm.$('link').bind()} autoComplete='off'/>
                    </FormItem>

                    <Row>
                        <Col span={8}>
                            <FormItem label={newsForm.$('color').label}>
                                <Input {...newsForm.$('color').bind()} autoComplete='off'/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            -
                        </Col>
                        <Col span={8}>
                            -
                        </Col>
                    </Row>

                    <FormItem>
                        <Button type="primary" loading={loading} htmlType="submit">SAVE</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default CMS
