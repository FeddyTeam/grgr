import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { Table, Row, Col, Select, Form } from 'antd'

const { Option } = Select
const FormItem = Form.Item

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
                key: 'content'
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
