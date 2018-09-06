import { gql } from 'graphql-tag'

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
