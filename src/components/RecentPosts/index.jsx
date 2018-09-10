import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Icon, message } from 'antd'

@inject('newsStore')
@observer
class RecentPosts extends Component {
    async checkRSS() {
        try {
            message.success('Checing for updates... this may take a few minutes', 5000)
            const count = await this.props.newsStore.checkRSS()

            message.success(`${count} posts updated`)
        } catch (err) {
            message.error(`Somthing Wrong? - ${err}`)
        }

        this.setState({
            loading: false
        })
    }

    render() {
        const { loading } = this.props.newsStore

        return (
            <div>
                <Button loading={loading} onClick={this.checkRSS.bind(this)}>UPDATE POSTS</Button>
            </div>
        )
    }
}

export default RecentPosts
