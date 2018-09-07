import { action, observable, runInAction, autorun } from 'mobx'
import apollo from '../apollo'

import setupLoading from './mixins/setupLoading'

@setupLoading
class UserStore {
    @observable users = []
    @observable user = {}

    @observable modalVisible = false
    @action.bound openModal() {
        this.modalVisible = true
    }
    @action.bound closeModal() {
        this.modalVisible = false
    }

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

    @action.bound async updateUser (userForm) {
        try {
            this.startProgress()

            const results = await apollo.user.updateUser(userForm.values())
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


    @action.bound async createUser (user) {
        try {
            this.startProgress()
            const results = await apollo.user.createUser(user)
            const { data: { user } } = results

            runInAction(() => {
                this.user = user
            })
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }
}

const userStore = new UserStore()

autorun(() => {
    console.log(userStore.users.length)
    console.log(userStore.modalVisible)
    // console.log(userStore.loading)
})

export default userStore
