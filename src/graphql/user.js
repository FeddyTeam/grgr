import gql from 'graphql-tag'

export const FETCH_USERS = gql`query {
    users: fetchUsers {
        id,
        email,
        username,
        name,
        email,
        avatar,
        adm,
        cms,
        abc,
        createdAt,
        status
    }
}`

export const CREATE_USER = gql`mutation ($user: UserInput!) {
    user: createUser (user: $user) {
        id,
        username,
        name,
        email,
        avatar,
        adm,
        cms,
        abc,
        status,
        createdAt
    }
}`

export const UPDATE_USER = gql`mutation ($user: UserUpdateInput!) {
    user: updateUser (user: $user) {
        id,
        username,
        email,
        name,
        avatar,
        adm,
        cms,
        abc,
        status,
        createdAt
    }
}`

export const FETCH_USER = gql`query ($id: ID!) {
    user: fetchUser (id: $id) {
        id,
        name,
        username,
        email,
        avatar,
        adm,
        cms,
        abc,
        status,
        createdAt
    }
}`
