import gql from 'graphql-tag'

export const LOGIN = gql`mutation ($form: LoginInput!) {
    authed: login (form: $form) {
        token,
        user {
            id,
            email
            name,
            username,
            avatar,
            adm,
            cms,
            abc
        }
    }
}`

export const UPDATE_PASSWORD = gql`mutation ($passwords: PasswordInput!) {
    updatePassword (passwords: $passwords)
}`

export const FETCH_PROFILE = gql`query {
    profile: getProfile {
        id,
        createdAt,
        updatedAt,

        status,
        username,
        name,
        email,
        bio,
        avatar,
        birthday,
        url
    }
}`

export const UPDATE_PROFILE = gql`mutation ($profile: ProfileInput!) {
    profile: updateProfile(profile: $profile) {
        id,
        createdAt,
        updatedAt,

        status,
        username,
        name,
        email,
        bio,
        avatar,
        birthday,
        url
    }
}`
