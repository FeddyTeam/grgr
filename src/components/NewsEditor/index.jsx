import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button, Select, Row, Col, message } from 'antd'
import newsForm from '../../forms/news'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

@inject('newsStore')
@observer
class CMS extends Component {

    async onSubmit(e) {
        e.preventDefault()
        try {
            // means: editing
            if (this.props.newsStore.currentId) {
                await this.props.newsStore.updateNews(newsForm)
            } else {
                await this.props.newsStore.createNews(newsForm)
                this.props.history.replace('/cms')
            }

            message.success('SUCCESS')
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
            newsForm.update(news) // contains a id
        } else {
            // TODO: Delete this

            newsForm.update({
                title: 'Hello World',
                altTitle: 'Test Item',
                content: '测试测试',

                image: 'https://static.feddy.org/FtnqM8NupRtfw_2-BUArl_nl_GiV',
                altImage: 'https://static.feddy.org/FtnqM8NupRtfw_2-BUArl_nl_GiV?imageView/0/w/640',
                thumbnail: 'https://static.feddy.org/FtnqM8NupRtfw_2-BUArl_nl_GiV?imageView/2/w/256',

                status: 'actived',
                type: 'news',
                level: 'normal',

                link: 'https://google.com',

                color: '#ffffff',

                userId: 'fake-user-id'
            })
        }
    }

    render() {
        const { loading, statusOptions, levelOptions, typeOptions } = this.props.newsStore

        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <Row>
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

                    <FormItem label={newsForm.$('title').label}>
                        <Input {...newsForm.$('title').bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem label={newsForm.$('altTitle').label}>
                        <Input {...newsForm.$('altTitle').bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem label={newsForm.$('content').label}>
                        <TextArea {...newsForm.$('content').bind()} autoComplete='off'/>
                    </FormItem>

                    <FormItem label={newsForm.$('image').label}>
                        <Input {...newsForm.$('image').bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem label={newsForm.$('altImage').label}>
                        <Input {...newsForm.$('altImage').bind()} autoComplete='off'/>
                    </FormItem>
                    <FormItem label={newsForm.$('thumbnail').label}>
                        <Input {...newsForm.$('thumbnail').bind()} autoComplete='off'/>
                    </FormItem>

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
