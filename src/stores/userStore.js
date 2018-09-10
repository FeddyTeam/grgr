import { action, observable, computed } from 'mobx'
import apollo from '../apollo'

import setupLoading from './mixins/setupLoading'
import setupModal from './mixins/setupModal'


@setupModal
@setupLoading
class UserStore {
    @observable storage = new Map()

    @computed get users() {
        return Array.from(this.storage.values())
    }

    @action.bound async fetchUsers () {
        try {
            this.startProgress()
            const results = await apollo.user.fetchUsers()
            const { data: { users } } = results

            users.reduce((s, user) => s.set(user.id, user), this.storage)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action.bound async updateUser (userInput) {
        try {
            this.startProgress()

            const results = await apollo.user.updateUser(userInput)
            const { data: { user } } = results

            this.storage.set(user.id, user)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }


    @action.bound async createUser (userInput) {
        try {
            this.startProgress()
            const results = await apollo.user.createUser(userInput)
            const { data: { user } } = results

            this.storage.set(user.id, user)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }
}

export default new UserStore()
