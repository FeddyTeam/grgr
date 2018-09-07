import { action, observable } from 'mobx'
import { auth } from '../apollo'
import setupLoading from './mixins/setupLoading'

@setupLoading
class AuthStore {
    @observable profile = {
        id: '',
        email: '',
        name: '',
        username: '',
        avatar: ''
    }
    @observable token = ''

    @action removeToken() {
        this.token = ''
        localStorage.removeItem('token')
    }

    @action.bound setProfile(profile) {
        this.profile = {
            ...this.profile,
            ...profile
        }
    }

    @action.bound setToken(token) {
        this.token = token
        localStorage.setItem('token', token)
    }

    @action.bound async login(loginForm) {
        try {
            this.startProgress()
            const results = await auth.login(loginForm.values())
            const { data: { authed: { token, user } } } = results
            this.setToken(token)
            this.setProfile(user)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }
}

export default new AuthStore()
