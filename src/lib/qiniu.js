import { UploaderBuilder } from 'qiniu4js'

export default function(options) {
    const opts = {
        multiple: false,
        accept: ['.png', '.jpg', '.jpeg', '.gif'],
        tokenUrl: '/k/qiniu',
        domains: {
            'https': 'https://upload-z2.qiniup.com',
            'http': 'http://upload-z2.qiniup.com'
        },
        host: 'https://static.feddy.org',
        imageView: '',
        onTaskProgress () {},
        onTaskSuccess () {},
        onTaskFail () {},
        onReady () {},
        onStart () {},
        jwtToken: '',
        ...options
    }

    const {
        multiple, accept,
        domains, tokenUrl,
        host, imageView,
        onTaskProgress, onTaskFail, onTaskSuccess, onReady, onStart,
        jwtToken
    } = opts

    const authorization = `Bearer ${jwtToken}`
    const headers = new Headers()
    headers.append('Authorization', authorization)

    const uploader = new UploaderBuilder()
        .domain(domains)
        .multiple(multiple)
        .accept(accept)
        .tokenFunc(async (setToken, task) => {
            const res = await fetch(tokenUrl, { headers })
            const json = await res.json()
            setToken(json.uptoken)
        })
        .listener({
            onTaskSuccess(task) {
                const url = `${host}/${task.result.key}${imageView}`
                onTaskSuccess({
                    ...task.result,
                    name: task.file.name,
                    url
                }, task)
            },
            onTaskFail(task) { onTaskFail(task) },
            onTaskProgress(task) { onTaskProgress(task) },
            onReady,
            onStart
        })
        .build()

    return uploader
}
