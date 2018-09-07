import gql from 'graphql-tag'

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

