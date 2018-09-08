import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './static/index.css'
import { App } from './components'
import registerServiceWorker from './registerServiceWorker'

import stores from './stores'
import { Provider } from 'mobx-react'

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter basename='/dashboard'>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'))
registerServiceWorker()
