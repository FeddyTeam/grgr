import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { Table, Row, Col, Select, Form, Tag } from 'antd'

const { Option } = Select
const FormItem = Form.Item

const levelTag = level => {
    const levelColors = {
        normal: 'blue',
        featured: 'orange',
        mustread: 'magenta',
        removed: '#ddd'
    }

    return <Tag color={levelColors[level]}>{level}</Tag>
}

const statusTag = status => {
    const statusColors = {
        draft: 'green',
        pending: 'cyan',
        actived: 'blue',
        expired: '#ddd',
        deleted: '#ddd'
    }

    return <Tag color={statusColors[status]}>{status}</Tag>
}

@withRouter
@inject('newsStore')
@observer
class NewsList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            columns: [{
                title: 'Thumbnail',
                dataIndex: 'thumbnail',
                key: 'thumbnail',
                render: thumbnail => <img src={thumbnail} alt='Thumbnail' height="48"/>
            }, {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            }, {
                title: 'Alt Title',
                dataIndex: 'altTitle',
                key: 'altTitle'
            }, {
                title: 'Content / Description',
                dataIndex: 'content',
                key: 'content',
                render: content => <div title={content}
                    style={{ maxWidth: '300px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'}}>{content}</div>
            }, {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: statusTag
            }, {
                title: 'Level',
                dataIndex: 'level',
                key: 'level',
                render: levelTag
            }, {
                title: 'By',
                dataIndex: 'user',
                key: 'user',
                render: user => <span>{user.name}</span>
            }, {
                title: 'Action',
                dataIndex: 'id',
                key: 'editing',
                render: id => <Link to={`/cms/edit/${id}`}>Edit</Link>
            }]
        }
    }

    render() {
        const { items, typeOptions, type } = this.props.newsStore

        return (
            <div>
                <Form>
                    <Row>
                        <Col span={8}>
                            <FormItem label='by Type'>
                                <Select value={type} onChange={val => this.props.newsStore.setType(val)}>
                                    {typeOptions.map(opt => <Option value={opt} key={opt}>{opt}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Table rowKey='id' columns={this.state.columns} dataSource={items} />
            </div>
        )
    }
}

export default NewsList
