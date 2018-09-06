import { action, observable } from 'mobx'
import { auth } from '../apollo'

class AuthStore {
    @observable loading = false
    @observable profile = {}

    @observable values = {
        username: '',
        password: ''
    }

    @action.bound async login() {
        try {
            const data = await auth.login(this.values)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
}

export default new AuthStore()
