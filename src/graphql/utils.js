import gql from 'graphql-tag'

export const CHECK_RSS = gql`mutation {
    count: checkRSS
}`

export const MK_QINIU_TOKEN = gql`mutation {
    token: mkQiniuToken
}`
