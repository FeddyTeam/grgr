import ApolloClient from 'apollo-boost'
import { LOGIN } from './graphql/auth'

const client = new ApolloClient({
    uri: 'https://graphql.example.com'
})

export const auth = {
    login({ username, password }) {
        return client.mutate({
            mutation: LOGIN,
            variables: {
                form: { username, password }
            }
        })
    }
}

