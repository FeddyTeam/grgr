import { action, observable } from 'mobx'
import apollo from '../apollo'

import setupLoading from './mixins/setupLoading'
import setupModal from './mixins/setupModal'


@setupModal
@setupLoading
class UserStore {
    @observable users = []

    @action.bound async fetchUsers () {
        try {
            this.startProgress()
            const results = await apollo.user.fetchUsers()
            const { data: { users } } = results

            this.users = users
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

            const idx = this.users.findIndex(({ id }) => id === user.id)
            if (idx >= 0) {
                this.users[idx] = user
            } else {
                this.fetchUsers()
            }
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

            this.users.push(user)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }
}

export default new UserStore()
