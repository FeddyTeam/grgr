import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Link } from 'react-router-dom'

import { Menu, Icon } from 'antd'
import { NewsList, NewsEditor, RecentPosts } from '..'

@inject('newsStore')
@observer
class CMS extends Component {

    componentWillMount() {
        this.props.newsStore.fetchNews()
    }

    render() {
        return (
            <div>
                <Menu mode="horizontal">
                    <Menu.Item key="/cms/index">
                        <Link to="/cms">
                            <Icon type="file-text" /> CMS INDEX
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/cms/edit">
                        <Link to="/cms/edit">
                            <Icon type="edit" /> CREATE NEWS
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/cms/recent-posts">
                        <Link to="/cms/recent-posts">
                            <Icon type="copy" /> RECENT POSTS
                        </Link>
                    </Menu.Item>
                </Menu>

                <Route path="/cms" exact component={NewsList} />
                <Route path="/cms/edit" exact component={NewsEditor} />
                <Route path="/cms/edit/:id" component={NewsEditor} props={{ editing: true }}/>
                <Route path="/cms/recent-posts" component={RecentPosts}/>

            </div>
        )
    }
}

export default CMS
