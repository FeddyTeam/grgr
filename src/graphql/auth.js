import gql from 'graphql-tag'

export const LOGIN = gql`mutation ($form: LoginInput!) {
    authed: login (form: $form) {
        token,
        user {
            id,
            email
            name,
            username,
            avatar
        }
    }
}`
