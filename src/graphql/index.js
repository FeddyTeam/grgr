import gql from 'graphql-tag'

export const GET_BUBBLES = gql`query getBubbles($skip: Int, $count: Int) {
    bubbleList: getBubbles(skip: $skip, count: $count) {
        id,
        text,
        user {
            id,
            username,
            name,
            avatar
        },
        comments {
            id,
            content,
            createdAt,
            user {
                id,
                username,
                name,
                avatar
            }
        },
        createdAt
    }
}`

export const GET_BUBBLES_PAGE = gql`query getBubblesPage($skip: Int, $count: Int) {
    bubblesPage: getBubblesPage(skip: $skip, count: $count) {
        hasMore,
        bubbles {
            id,
            text,
            cover,
            link,
            data,
            user {
                id,
                username,
                name,
                avatar
            },
            comments {
                id,
                content,
                createdAt,
                user {
                    id,
                    username,
                    name,
                    avatar
                }
            },
            createdAt
        }
    }
}`

export const GET_COMMENTS = gql`query ($bubbleId: ID!, $skip: Int, $count: Int) {
    comments: getComments(bubbleId: $bubbleId, skip: $skip, count: $count) {
        id,
        content,
        createdAt,
        user {
            id,
            username,
            name,
            avatar
        }
    }
}
`

export const CREATE_COMMENT = gql`mutation ($comment: CommentInput!) {
    newComment: createComment(comment: $comment) {
        id,
        content,
        createdAt,
        user {
            id,
            username,
            name,
            avatar
        }
    }
}`

export const CREATE_BUBBLE = gql`mutation ($bubble: BubbleInput!) {
    newBubble: createBubble(bubble: $bubble) {
        id,
        text,
        data,
        user {
            id,
            username,
            name,
            avatar,
        },
        comments {
            id,
            content
        },
        createdAt
    }
}`

export const GET_PROFILE = gql`query {
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

export const DELETE_NEWS = gql`mutation ($ids: [ID]!) {
    count: deleteNews(ids: $ids)
}`

export const PERMANENTLY_DELETE_NEWS = gql`mutation ($ids: [ID]!){
    count: permanentlyDeleteNews(ids: $ids)
}`

export const CREATE_NEWS = gql`mutation ($news: NewsInput!) {
    createdNews: createNews(news: $news) {
        id,
        type, status, level,
        title, altTitle, content,
        image, altImage, thumbnail,
        data, link, icon,
        createdAt,
        updatedAt,
        expiredAt,
        activedAt,
        user {
            avatar,
            username,
            name,
            id
        }
    }
}`

export const UPDATE_NEWS = gql`mutation ($news: NewsInput!) {
    updatedNews: createNews(news: $news) {
        id,
        type, status, level,
        title, altTitle, content,
        image, altImage, thumbnail,
        data, link, icon,
        createdAt,
        updatedAt,
        expiredAt,
        activedAt,
        user {
            avatar,
            username,
            name,
            id
        }
    }
}`

export const FETCH_NEWS = gql`query ($type: NewsType!, $skip: Int, $count: Int) {
    pagedList: fetchTypedNews (type: $type, skip: $skip, count: $count) {
        hasMore,
        news {
            id,
            type, status, level,
            title, altTitle, content,
            image, altImage, thumbnail,
            data, link, icon,
            expiredAt,
            activedAt,
            createdAt, updatedAt,
            user {
                avatar,
                username,
                name,
                id
            }
        }
    }
}`

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

export const LOGIN = gql`mutation ($form: LoginInput!) {
    authed: login (form: $form) {
        message,
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

export const UPDATE_PASSWORD = gql`mutation ($passwords: PasswordInput!) {
    updatePassword (passwords: $passwords)
}`

export const CREATE_USER = gql`mutation ($user: UserInput!) {
    user: createUser (user: $user) {
        id,
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

export const UPDATE_USER = gql`mutation ($user: UserUpdateInput!) {
    user: updateUser (user: $user) {
        id,
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
