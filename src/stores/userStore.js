import { action, observable } from 'mobx'

class UserStore {
    @observable loading = false
    @observable users = []

    @action.bound
    startLoading () {
        this.loading = true
    }

    @action.bound
    stopLoading () {
        this.loading = false
    }

    @action.bound async fetchUsers () {

    }
}

export default new UserStore()
