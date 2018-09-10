import { action, observable, computed } from 'mobx'
import apollo from '../apollo'
import setupLoading from './mixins/setupLoading'

@setupLoading
class AuthStore {
    @observable profile = {
        id: '',
        email: '',
        name: '',
        username: '',
        avatar: '',
        adm: false,
        cms: false,
        abc: false
    }
    @observable token = ''
    @observable info = {}

    @computed({ keepAlive: true }) get keys() {
        return this.info.keys || {}
    }

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

    @action.bound loadToken() {
        const token = localStorage.getItem('token')
        if (/^\w+\.\w+\.\w+$/.test(token)) {
            this.setToken(token)
            this.fetchProfile()
        }
    }

    @action.bound setToken(token) {
        this.token = token
        localStorage.setItem('token', token)

        try {
            const payload = JSON.parse(atob(token.match(/\.(\w+)\./)[1]))
            if (payload.exp * 1000 > new Date().getTime()) {
                this.info = payload
            } else {
                throw new Error('Token is outdated')
            }
        } catch (err) {
            this.removeToken()
            throw new Error(err.message)
        }
    }

    @action.bound async fetchProfile() {
        try {
            this.startProgress()
            const results = await apollo.auth.fetchProfile()
            const { data: { profile } } = results
            this.setProfile(profile)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action.bound async login(values) {
        try {
            this.startProgress()
            const results = await apollo.auth.login(values)
            const { data: { authed: { token, user } } } = results
            this.setToken(token)
            this.setProfile(user)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action.bound logout() {
        this.info = {}
        this.removeToken()
    }

    @action.bound async updatePassword(values) {
        try {
            this.startProgress()
            await apollo.auth.updatePassword(values)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }

    @action.bound async updateProfile(values) {
        try {
            this.startProgress()
            const results = await apollo.auth.updateProfile(values)
            const { data: { profile } } = results
            this.setProfile(profile)
        } catch (err) {
            throw err.message
        } finally {
            this.stopProgress()
        }
    }
}

export default new AuthStore()
