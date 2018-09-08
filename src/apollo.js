import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { LOGIN, UPDATE_PASSWORD, FETCH_PROFILE } from './graphql/auth'
import { FETCH_NEWS, CREATE_NEWS, UPDATE_NEWS, DELETE_NEWS, PERMANENTLY_DELETE_NEWS } from './graphql/news'
import { CREATE_USER, UPDATE_USER, FETCH_USERS, FETCH_USER } from './graphql/user'

const httpLink = createHttpLink({
    uri: '/graphql'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export const auth = {
    login({ username, password }) {
        return client.mutate({
            mutation: LOGIN,
            variables: {
                form: { username, password }
            }
        })
    },
    updatePassword({ password, newPassword }) {
        return client.mutate({
            mutation: UPDATE_PASSWORD,
            variables: {
                passwords: { password, newPassword }
            }
        })
    },
    fetchProfile() {
        return client.query({
            query: FETCH_PROFILE
        })
    }
}

export const news = {
    fetchNews({ type, skip, count }) {
        return client.query({
            query: FETCH_NEWS,
            variables: { type, skip, count }
        })
    },
    createNews(news) {
        return client.mutate({
            mutation: CREATE_NEWS,
            variables: { news }
        })
    },
    updateNews(news) {
        return client.mutate({
            mutation: UPDATE_NEWS,
            variables: { news }
        })
    },
    deleteNews(ids) {
        return client.mutate({
            mutation: DELETE_NEWS,
            variables: { ids }
        })
    },
    permanentlyDeleteNews(ids) {
        return client.mutate({
            mutation: PERMANENTLY_DELETE_NEWS,
            variables: { ids }
        })
    }
}

export const user = {
    fetchUsers() {
        return client.query({
            query: FETCH_USERS
        })
    },
    fetchUser(id) {
        return client.query({
            query: FETCH_USER,
            variables: { id }
        })
    },
    createUser(user) {
        return client.mutate({
            mutation: CREATE_USER,
            variables: { user }
        })
    },
    updateUser(user) {
        return client.mutate({
            mutation: UPDATE_USER,
            variables: { user }
        })
    }
}

export default {
    user, auth, news
}
