import { action, observable, runInAction, computed, toJS } from 'mobx'
import apollo from '../apollo'
import setupLoading from './mixins/setupLoading'

@setupLoading
class AuthStore {
    statusOptions = ['draft', 'pending', 'actived', 'expired', 'deleted']
    typeOptions = ['news', 'project', 'event', 'post', 'notice', 'alert', 'story', 'link', 'ad', 'special']
    levelOptions = ['removed', 'normal', 'featured', 'mustread']
    @observable type = 'news'
    @observable count = 32
    @observable skip = 0
    @observable hasMore = true

    @observable storage = new Map()
    @observable currentId = ''

    @action.bound setCurrentId(id) {
        this.currentId = id
    }

    @action.bound setType(type) {
        this.type = type
        this.fetchNews()
    }

    @action.bound nextPage() {
        this.skip += this.count
    }

    @action.bound clear() {
        this.items = []
    }

    @action.bound async fetchNews() {
        const { type, skip, count } = this

        try {
            this.startProgress()
            const results = await apollo.news.fetchNews({ type, skip, count })
            const { data: { pagedList: { hasMore, news } } } = results

            runInAction(() => {
                news.forEach(one => {
                    this.storage.set(one.id, one)
                })
                this.hasMore = hasMore
            })
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action.bound async createNews(newsForm) {
        try {
            this.startProgress()
            const results = await apollo.news.createNews(newsForm.values())
            const { data: { createdNews } } = results

            this.storage.set(createdNews.id, createdNews)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action.bound async updateNews(newsForm) {
        try {
            this.startProgress()
            const results = await apollo.news.updateNews(newsForm.values())
            const { data: { updatedNews } } = results

            this.storage.set(updatedNews.id, updatedNews)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @computed get items() {
        const results = []
        this.storage.forEach(one => {
            if (one.type === this.type) {
                results.push(one)
            }
        })

        return results
    }

    @computed get currentNews() {
        return toJS(this.storage.get(this.currentId)) || {}
    }
}

export default new AuthStore()